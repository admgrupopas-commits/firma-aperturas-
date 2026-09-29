
// Ancho real de un texto (sin kerning, igual a como se dibuja)
const anchoTxt=(f,t,s)=>{let a=0;for(const ch of t)a+=f.widthOfTextAtSize(ch,s);return a};
// Escribe un párrafo con los datos incorporados, justificado como el original.
function escribirBloque(pg, b, datos, fN, fB, sN, sB){
  if(b.sans){ fN=sN; fB=sB; }
  const H=pg.getHeight(), negro=PDFLib.rgb(0,0,0), size=b.size;
  if(b.tapar&&b.limpiar){ const [x0,y0,x1,y1]=b.limpiar; pg.drawRectangle({x:x0,y:H-y1,width:x1-x0,height:y1-y0,color:PDFLib.rgb(1,1,1)}); }
  const partes=[]; // palabras con estilo
  const agregar=(txt,bold)=>txt.split(/(\s+)/).forEach(w=>{ if(!w) return; if(/^\s+$/.test(w)) partes.push({esp:true}); else partes.push({w,bold}); });
  const armar=t=>{ partes.length=0;
    const re=/\{(\w+)\}|\*\*(.+?)\*\*/g; let i=0,m;
    while((m=re.exec(t))){ agregar(t.slice(i,m.index),false);
      if(m[1]) agregar(String(datos[m[1]]||'').trim(),true); else agregar(m[2],true); i=re.lastIndex; }
    agregar(t.slice(i),false);
    // pegar signos a la palabra anterior (evita "Pérez ," )
    const out=[]; for(const p of partes){ if(p.esp){ if(out.length&&!out[out.length-1].esp) out.push(p); continue; }
      const prev=out[out.length-1];
      if(prev&&!prev.esp&&out.length){ prev.seg=(prev.seg||[{w:prev.w,bold:prev.bold}]); prev.seg.push({w:p.w,bold:p.bold}); prev.w+=p.w; }
      else out.push(p); }
    return out.filter(p=>!p.esp).map(p=>p.seg||[{w:p.w,bold:p.bold}]);
  };
  const ancho=seg=>seg.reduce((s,x)=>s+anchoTxt((x.bold?fB:fN),x.w,size),0);
  const esp=anchoTxt(fN,' ',size);
  const dibujarLinea=(pal,y,x0,x1,justificar)=>{
    const anchos=pal.map(ancho), total=anchos.reduce((a,b)=>a+b,0);
    let gap=esp, x=x0;
    if(b.al==='r') x=x1-(total+esp*(pal.length-1));
    if(justificar&&pal.length>1) gap=Math.max(esp,(x1-x0-total)/(pal.length-1));
    pal.forEach((seg,i)=>{ for(const s of seg){ pg.drawText(s.w,{x,y:H-y,size,font:s.bold?fB:fN,color:negro}); x+=anchoTxt((s.bold?fB:fN),s.w,size);} x+=gap; });
  };
  if(b.lineas){ b.lineas.forEach((t,i)=>dibujarLinea(armar(t),b.base+i*b.lh,b.x0,b.x1,false)); return; }
  const pal=armar(b.t);
  if(b.al!=='j'){ // una sola línea: si no entra, se achica
    let s=size; const w=pal.reduce((a,p)=>a+ancho(p),0)+esp*(pal.length-1);
    if(w>b.x1-b.x0){ const f=(b.x1-b.x0)/w; b=Object.assign({},b,{size:size*f}); return escribirBloque(pg,Object.assign({},b,{tapar:false}),datos,fN,fB,sN,sB); }
    dibujarLinea(pal,b.base,b.x0,b.x1,b.al==='j1'); return; }
  let linea=[],w=0,n=0; const ind=b.indent||0;
  for(const p of pal){ const a=ancho(p), lim=b.x1-b.x0-(n===0?ind:0);
    if(linea.length&&w+esp+a>lim){ dibujarLinea(linea,b.base+n*b.lh,b.x0+(n===0?ind:0),b.x1,true); n++; linea=[p]; w=a; }
    else { w+=(linea.length?esp:0)+a; linea.push(p); } }
  if(linea.length) dibujarLinea(linea,b.base+n*b.lh,b.x0+(n===0?ind:0),b.x1,false);
}
window.completarPDF = async function(baseBytes, comp, datos, firmaPngBytes){
  const {PDFDocument, StandardFonts, rgb} = PDFLib;
  const doc = await PDFDocument.load(baseBytes);
  const times = comp.fuente==='times';
  const font = await doc.embedFont(times?StandardFonts.TimesRoman:StandardFonts.Helvetica);
  const fB = await doc.embedFont(StandardFonts.TimesRomanBold), fN = times?font:await doc.embedFont(StandardFonts.TimesRoman);
  const tinta = times?rgb(0,0,0):rgb(0.08,0.13,0.4), blanco = rgb(1,1,1);
  const pages = doc.getPages();
  if (comp.formulario){
    const form = doc.getForm();
    for (const [campo, fuente] of Object.entries(comp.formulario)){
      const v = (typeof fuente==='function' ? fuente(datos) : datos[fuente]) || '';
      try{ const f=form.getTextField(campo); f.setFontSize(0); f.setText(String(v)); }catch(e){ console.warn('campo',campo,e) }
    }
    form.updateFieldAppearances(font);
    form.flatten();
  }
  const sN = await doc.embedFont(StandardFonts.Helvetica), sB = await doc.embedFont(StandardFonts.HelveticaBold);
  for (const b of (comp.bloques||[])) escribirBloque(pages[b.p-1], b, datos, fN, fB, sN, sB);
  for (let [p,x,base,w,k,al] of (comp.campos||[])){
    let txt = (datos[k]||'').toString().trim(); if(!txt) continue;
    if(al!=='c'){ x+=2; w-=2; }
    let size = 10; while(size>5.5 &&anchoTxt( font,txt,size)>w-2) size-=0.25;
    const tw =anchoTxt( font,txt,size);
    let xx = x; if(al==='c') xx = x+(w-tw)/2; if(al==='r') xx = x+w-tw;
    const pg = pages[p-1], H = pg.getHeight(), y = H-base;
    if(!comp.formulario) pg.drawRectangle({x:xx-1.5, y:y-2.6, width:tw+3, height:size*0.95+2.6, color:blanco});
    pg.drawText(txt,{x:xx,y,size,font,color:tinta});
  }
  // cajas: texto dentro de un recuadro [pagina, x0, y0, x1, y1 (coordenadas PDF), clave o función]
  for (const [p,x0,y0,x1,y1,fuente] of (comp.cajas||[])){
    const txt=String((typeof fuente==='function'?fuente(datos):datos[fuente])||'').trim(); if(!txt) continue;
    let s=Math.min(10,(y1-y0)*0.8); while(s>5.5 &&anchoTxt( fN,txt,s)>x1-x0-4) s-=0.25;
    pages[p-1].drawText(txt,{x:x0+2,y:y0+(y1-y0-s*0.68)/2,size:s,font:comp.fuente==='times'?fN:font,color:rgb(0,0,0)});
  }
  for (const [p,x0,y0,x1,y1,fn] of (comp.marcas||[])){
    if(!fn(datos)) continue; const s=10, tw=anchoTxt(font,'X',s);
    pages[p-1].drawText('X',{x:(x0+x1-tw)/2,y:(y0+y1)/2-s*0.35,size:s,font,color:rgb(0,0,0)});
  }
  for (const [p,x0,y,x1] of (comp.lineas||[])){ const pg=pages[p-1]; pg.drawLine({start:{x:x0,y:pg.getHeight()-y},end:{x:x1,y:pg.getHeight()-y},thickness:0.7,color:rgb(0,0,0)}); }
  if (firmaPngBytes){
    const img = await doc.embedPng(firmaPngBytes);
    for (const [p,x,top,w,h] of (comp.firmas||[])){
      const s = Math.min(w/img.width, h/img.height), iw=img.width*s, ih=img.height*s;
      const pg = pages[p-1], H = pg.getHeight();
      pg.drawImage(img,{x:x+(w-iw)/2, y:H-(top+h), width:iw, height:ih});
    }
  }
  doc.setTitle(comp.archivo+' - '+(datos.nombre||''));
  return await doc.save();
};

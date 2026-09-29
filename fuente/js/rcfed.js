(function(){
 const ln=(k,i)=>d=>(String(d[k]||'').split(/\n/).map(s=>s.trim()).filter(Boolean))[i]||'';
 const mail=(i)=>d=>(String(d.email||'').split('@'))[i]||'';
 window.RCFED={
  cajas:[
   [1,139,662,384,673,'nombre'],[1,488,662,572,673,'dniNum'],
   [1,142,650,160,663,'nacDia'],[1,163,650,182,663,'nacMes'],[1,184,650,224,663,'nacAnio'],
   [1,283,652,428,662,'rcLugarNac'],[1,466,652,572,662,d=>(d.nacionalidad||'').toUpperCase()],
   [1,174,640,243,651,'estadoCivil'],[1,331,640,403,652,'cuit'],
   [1,464,640,572,651,d=>({RI:'Responsable Inscripto',MT:'Monotributo',EX:'Exento'})[d.iva]||''],
   [1,465,629,572,640,'iibb'],
   [1,138,619,250,630,'calleSola'],[1,261,619,285,630,'numero'],[1,298,619,313,630,'piso'],[1,331,619,346,630,'depto'],
   [1,376,619,449,630,'ciudad'],[1,461,619,485,630,'cp'],[1,500,619,572,630,'provincia'],
   [1,109,608,134,619,d=>d.telefono?d.telCaract:''],[1,141,608,194,619,d=>d.telefono?String(d.telefono).replace(/^\s*\S+\s+/,'').replace(/\D/g,''):''],
   [1,231,608,255,619,'telCaract'],[1,270,608,324,619,'telNum'],
   [1,348,606,468,617,mail(0)],[1,475,606,572,617,mail(1)],
   [1,191,592,431,604,()=>'Productor Asesor de Seguros'],
   [1,498,339,550,352,'rcCertificados'],[1,167,309,219,323,d=>d.fedAntig?d.fedAntig+' años':''],[1,178,295,320,309,'matricula'],
   [1,334,316,571,330,ln('rcBancos',0)],[1,334,300,571,313,ln('rcBancos',1)],
   [1,334,276,571,289,ln('rcEstructura',0)],[1,334,261,571,275,ln('rcEstructura',1)],[1,334,246,571,259,ln('rcEstructura',2)],[1,334,230,571,243,ln('rcEstructura',3)],
   [1,83,238,320,251,d=>d.fedZonas],
   [1,179,192,250,205,'rcIngresos'],[1,334,189,571,202,'rcSoftware'],
   [1,81,165,319,178,ln('fedAseg',0)],[1,81,150,319,164,ln('fedAseg',1)],[1,81,135,319,148,ln('fedAseg',2)],
   [1,334,166,571,179,ln('rcCursos',0)],[1,334,150,571,164,ln('rcCursos',1)],[1,334,134,571,147,ln('rcCursos',2)],
   [1,334,96,571,110,ln('rcSegPrev',0)],[1,334,81,571,94,ln('rcSegPrev',1)],
   [2,23,801,513,814,ln('rcReclamos',0)],[2,23,785,513,798,ln('rcReclamos',1)],
   [2,23,720,513,733,ln('rcSanciones',0)],[2,23,704,513,718,ln('rcSanciones',1)],
   [2,112,573,212,586,'rcSuma'],
   [2,46,84,213,95,'ciudad'],[2,378,70,513,83,'nombre'],
   [2,45,61,64,74,'dia'],[2,70,61,89,74,'mesNum'],[2,96,61,136,74,'anio']
  ],
  marcas:[
   [1,261,672,272,683,()=>true],[1,387,662,398,673,()=>true],
   [1,109,639,120,651,d=>d.rcSexo==='Masculino'],[1,126,639,137,651,d=>d.rcSexo==='Femenino'],
   [1,247,640,258,651,()=>true],[1,192,629,203,640,()=>true],
   [1,539,593,550,604,d=>d.rcPep==='Si'],[1,561,593,572,604,d=>d.rcPep!=='Si'],
   [1,181,340,192,351,()=>true],[1,160,282,171,290,()=>true],
   [2,282,649,293,660,d=>d.rcPeriodo==='2 años'],[2,282,638,293,649,d=>d.rcPeriodo==='5 años'],[2,282,626,293,637,d=>d.rcPeriodo==='10 años'],
   [2,93,593,104,604,d=>d.rcAapas==='Si'],[2,146,593,157,604,d=>d.rcAapas!=='Si'],
   [2,355,573,366,584,d=>d.rcRepos==='Una'],[2,423,573,434,584,d=>d.rcRepos!=='Una']
  ],
  firmas:[[2,228,734,130,38]]
 };
})();

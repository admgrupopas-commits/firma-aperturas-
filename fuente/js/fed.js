(function(){
 const MES=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
 const lin=(d,i)=>(d.fedAseg||'').split(/\n/).map(s=>s.trim()).filter(Boolean)[i]||'';
 window.FEDERACION={
  cajas:[
   [1,336,710,571,723,'lugarFecha'],
   [1,100,641,360,654,'apellido'],[1,395,641,571,654,'nombres'],
   [1,111,627,220,640,'estadoCivil'],[1,289,627,309,640,'nacDia'],[1,310,627,337,640,d=>MES[+d.nacMes-1]||''],[1,338,627,372,640,'nacAnio'],
   [1,473,627,571,640,d=>(d.nacionalidad||'').toUpperCase()],
   [1,92,573,358,586,'calleSola'],[1,373,573,422,586,'numero'],[1,446,573,495,586,'piso'],[1,522,573,571,586,'depto'],
   [1,102,558,209,572,d=>d.telefono||d.celular],[1,286,558,571,572,'email'],
   [1,88,544,140,557,'cp'],[1,182,544,323,557,'ciudad'],[1,356,544,571,557,'provincia'],
   [1,92,481,358,494,'calleSola'],[1,373,481,422,494,'numero'],[1,446,481,495,494,'piso'],[1,522,481,571,494,'depto'],
   [1,88,467,119,479,'cp'],[1,153,467,220,480,'ciudad'],[1,254,466,359,479,'provincia'],[1,393,466,460,480,'celular'],
   [1,92,281,133,293,()=>'DNI'],[1,151,292,234,305,'dni'],[1,268,292,351,305,'cuit'],[1,359,292,480,305,'osseg'],[1,487,292,564,305,'matricula'],
   [1,388,257,541,270,'cuit'],[1,244,245,366,256,d=>({RI:'Responsable Inscripto',MT:'Responsable Monotributo',EX:'Exento'})[d.iva]||''],
   [1,75,210,208,223,d=>d.iibbTipo!=='Exento'&&/Aut[oó]noma/.test(d.provincia)?d.iibb:''],
   [1,210,210,343,223,d=>d.iibbTipo!=='Exento'&&!/Aut[oó]noma/.test(d.provincia)?d.iibb:''],
   [1,166,125,330,137,d=>d.fedAntig?d.fedAntig+' años':''],[1,201,111,571,123,'fedZonas'],
   [2,46,795,315,808,d=>lin(d,0)],[2,46,781,315,794,d=>lin(d,1)],[2,46,767,315,780,d=>lin(d,2)],[2,46,753,315,766,d=>lin(d,3)],
   [2,328,347,528,360,'nombre'],
   [3,208,691,514,705,'nombre'],[3,152,604,194,618,()=>'DNI'],[3,205,604,279,618,'dni'],[3,405,604,566,618,()=>'Titular'],
   [3,76,412,272,425,'ciudad'],[3,300,412,378,425,'fechaCorta'],[3,331,377,496,391,'nombre']
  ],
  bloques:[
   {p:4,sans:1,al:'l',x0:212,x1:520,base:124.5,size:10.5,t:'{nombre}'},
   {p:4,sans:1,al:'l',x0:266,x1:520,base:153,size:10.5,t:'{matricula}'},
   {p:4,sans:1,al:'l',x0:146,x1:520,base:179.5,size:10.5,t:'{cuit}'},
   {p:4,sans:1,al:'l',x0:205,x1:460,base:444,size:10.5,t:'{nombre}'},
   {p:4,sans:1,al:'l',x0:207,x1:460,base:471,size:10.5,t:'{dni}'}
  ],
  marcas:[
   [1,492,214,503,225,d=>d.iibbTipo==='Convenio Multilateral'],[1,430,214,441,225,d=>d.iibbTipo==='Local'],
   [3,527,693,539,704,d=>d.fedVida==='Si'],[3,553,693,564,704,d=>d.fedVida!=='Si'],
   [3,279,679,291,690,d=>d.fedVida==='Si']
  ],
  firmas:[[2,70,452,170,40],[3,78,428,120,26],[4,170,262,270,140]]
 };
})();

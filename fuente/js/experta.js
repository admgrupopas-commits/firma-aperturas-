(function(){
 const armar=(fin,sinOtro)=>[
  {p:1,tapar:1,sans:1,limpiar:[240,112,532,129],al:'r',x0:250,x1:528,base:125,size:11,t:'{lugar}, {dia} de {mes} de {anio}'},
  {p:1,tapar:1,sans:1,limpiar:[84,0,532,0],al:'j1',x0:85,x1:528,base:0,size:11,t:'proponemos que la relación entre {nombre} (en adelante, el “PRODUCTOR”) y'},
  {p:fin,tapar:1,sans:1,limpiar:[84,0,532,0],al:'l',x0:85,x1:528,base:0,size:11,t:'El PRODUCTOR: {calle}, {ciudad}, {provincia}.'},
  {p:fin,sans:1,al:'l',x0:85,x1:400,base:sinOtro+92,size:10.5,t:'Aclaración: {nombre}'},
  {p:fin,sans:1,al:'l',x0:85,x1:400,base:sinOtro+107,size:10.5,t:'DNI: {dni} · CUIT: {cuit}'},
  {p:fin,sans:1,al:'l',x0:85,x1:400,base:sinOtro+122,size:10.5,t:'Matrícula SSN: {matricula}'}
 ];
 const ajustar=(b,y1,yP)=>{ b[1].limpiar=[84,y1-3,532,y1+14]; b[1].base=y1+10; b[2].limpiar=[84,yP-3,532,yP+14]; b[2].base=yP+10; return b; };
 window.EXPERTA={
  art:{ bloques: ajustar(armar(20,556),413,304), firmas:[[20,85,572,170,40]], lineas:[[20,85,615,280]] },
  seg:{ bloques: ajustar(armar(20,518),402,298), firmas:[[20,85,534,170,40]], lineas:[[20,85,577,280]] }
 };
})();

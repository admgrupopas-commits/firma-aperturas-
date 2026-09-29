(function(){
 const H=841.89, c=(p,x0,x1,t,b,fn)=>[p,x0,H-b,x1,H-t,fn];   // celda en coordenadas desde arriba
 const L=(p,x,base,t,w)=>({p,sans:1,al:'l',x0:x,x1:x+(w||200),base,size:8.5,t});
 const R=[668,689,709,730,751,772,793], fila=(i)=>[R[i],R[i+1]];
 window.BERKLEY={
  bloques:[
   L(1,440,171,'{dia}',28),L(1,480,171,'{mesNum}',30),L(1,518,171,'{anio}',32),
   L(1,124,241,'{nombre}',316),
   L(1,68,327,'{calleSola}',256),L(1,418,327,'{numero}',24),L(1,460,322,'{piso}',26),L(1,503,322,'{depto}',30),
   L(1,85,358,'{ciudad}',128),L(1,317,362,'{provincia}',85),L(1,490,362,'{cp}',30),
   L(1,84,397,'{telefono}',128),L(1,346,397,'{celular}',140),
   L(1,68,448,'{calleSola}',248),L(1,401,448,'{numero}',34),L(1,458,444,'{piso}',18),L(1,501,444,'{depto}',22),
   L(1,85,478,'{ciudad}',116),L(1,304,478,'{provincia}',80),L(1,480,478,'{cp}',30),
   L(1,80,513,'{telefono}',124),L(1,291,513,'{email}',180),
   L(1,187,563,'{dniNum}',100),L(1,352,563,'{matricula}',190),
   L(1,88,594,'{nacDia}',11),L(1,105,594,'{nacMes}',11),L(1,121,594,'{nacAnio2}',11),
   L(1,223,594,'{estadoCivil}',94),L(1,412,594,'{nacionalidad}',82),
   L(1,90,657,'{cuit}',200),
   L(2,200,124.5,'Grupo PAS',300),
   L(3,65,151,'{cbu}',400),L(3,76,179,'{banco}',220),L(3,352,194,'{sucursal}',190),
   L(3,385,300,'{nombre}',168)
  ],
  marcas:[
   c(1,166,209,160,176,d=>d.berkleyCia!=='BIS ART'), c(1,322,361,160,176,d=>d.berkleyCia!=='BIS'),
   c(1,36,68,547,572,()=>true),
   c(1,181,212,...fila(0),d=>d.iva==='RI'), c(1,181,212,...fila(1),d=>d.iva==='MT'), c(1,181,212,...fila(2),d=>d.iva==='EX'),
   c(1,350,381,...fila(0),d=>d.iva!=='MT'&&d.ganancias==='Inscripto'), c(1,350,381,...fila(1),d=>d.iva!=='MT'&&d.ganancias==='No inscripto'),
   c(1,350,381,...fila(2),d=>d.iva==='MT'), c(1,350,381,...fila(3),d=>d.iva!=='MT'&&d.ganancias==='Exento'),
   c(1,519,554,...fila(0),d=>d.iibbTipo==='Convenio Multilateral'), c(1,519,554,...fila(1),d=>d.iibbTipo==='Local'),
   c(1,519,554,...fila(2),d=>d.iibbTipo==='No inscripto'), c(1,519,554,...fila(3),d=>d.iibbTipo==='Exento')
  ],
  firmas:[[3,55,258,140,42]]
 };
})();

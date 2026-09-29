window.CARUSO = {
 formulario:{
  '4':'nombre','5':'cuit','6':'matricula','7':'calleSola','8':d=>[d.numero,d.piso&&('P'+d.piso),d.depto].filter(Boolean).join(' '),
  '9':'cp','10':'ciudad','11':'provincia','12':'email','13':'celular',
  '17':'osseg','21':()=>'Grupo PAS','27':'lugarFecha','29':'nombre'
 },
 marcas:[
  [1,424,752,433,758,()=>true],                                  // alta nuevo PAS
  [1,231,476,240,482,d=>d.iva==='RI'],[1,231,456,240,462,d=>d.iva!=='RI'],
  [1,231,435,240,441,d=>!!d.osseg],[1,231,415,240,421,d=>!d.osseg],
  [1,231,365,240,371,()=>true],                                  // PAS por organizado
  [1,231,343,240,349,d=>d.iibbTipo==='Convenio Multilateral'],[1,231,323,240,329,d=>d.iibbTipo!=='Convenio Multilateral']
 ],
 bloques:[
  // p2 DDJJ UIF
  {p:2,tapar:1,sans:1,limpiar:[41,161,470,173],al:'l',x0:42,x1:468,base:170.3,size:8,t:'**El /la que suscribe,** {nombre}, **DNI / CUIT:** {cuit}'},
  {p:2,tapar:1,sans:1,limpiar:[41,317,410,329],al:'l',x0:42,x1:405,base:326.3,size:8,t:'{email}'},
  {p:2,tapar:1,sans:1,limpiar:[41,356,330,368],al:'l',x0:42,x1:328,base:365.3,size:8,t:'Tel. Caract: ({telCaract}) Tel. Núm.: ({telNum})'},
  {p:2,tapar:1,sans:1,limpiar:[26,721,270,732],al:'l',x0:27,x1:268,base:730,size:8,t:'**Lugar y fecha:** {lugarFecha}'},
  {p:2,tapar:1,sans:1,limpiar:[315,767,545,779],al:'l',x0:316,x1:543,base:776,size:8,t:'**Matricula Nº** {matricula}'},
  // p3 carta propuesta
  {p:3,tapar:1,sans:1,limpiar:[320,103,515,118],al:'l',x0:327,x1:512,base:114,size:10,t:'Córdoba, {dia} de {mes} de {anio}'},
  {p:3,tapar:1,sans:1,limpiar:[84,154,400,168],al:'l',x0:85,x1:398,base:165,size:10,t:'**Sr./a.** {nombre}'},
  {p:3,tapar:1,sans:1,limpiar:[84,228,516,362],al:'j',x0:85,x1:510,base:239,lh:17.3,size:10,
   t:'Quien suscribe, Sr. LOPEZ MIGUEL OMAR, D.N.I: 18.175.283, en mi carácter de Gerente Comercial de CARUSO COMPANIA ARGENTINA DE SEGUROS S.A., (en adelante “CARUSO”) C.U.I.T: 30-51830942-7 con domicilio en Avenida Marcelo T. de Alvear 328 de esta ciudad de Córdoba, me dirijo a Ud., en su calidad de Productor Asesor de Seguros, {nombre}, C.U.I.T. {cuit}, Matrícula N.º {matricula}, con domicilio en calle {calle}, de la Ciudad de {ciudad}, (en adelante el “PRODUCTOR”) a efectos de hacerle llegar una propuesta de comercialización de los Productos de Seguros de Vida y Patrimoniales, en los términos y condiciones que se acompaña a la presente.'},
  {p:3,tapar:1,sans:1,limpiar:[84,371,516,418],al:'j',x0:85,x1:510,base:382,lh:17.3,size:10,
   t:'La misma tendrá una validez de quince días desde la fecha de su recepción, por lo que la misma podrá ser aceptada por El PRODUCTOR hasta el día {vence} inclusive, mediante envío de nota de aceptación debidamente firmada.'},
  // p4 CBU
  {p:4,tapar:1,sans:1,limpiar:[84,290,516,304],al:'j1',x0:85,x1:510,base:301,size:10,t:'CA / CC CBU N° {cbu}, entre los días 15 y 25 de cada mes, dicha'},
  // p7 fecha de firma
  {p:7,tapar:1,sans:1,limpiar:[84,347,516,361],al:'l',x0:85,x1:510,base:358,size:10,t:'solo efecto, en la Ciudad de Córdoba, a los {dia} días del mes de {mes} de {anio}.'},
  // p9 esquema comisional
  {p:9,tapar:1,sans:1,limpiar:[84,412,220,426],al:'l',x0:85,x1:218,base:423,size:10,t:'{fechaCorta}'},
  {p:9,sans:1,al:'l',x0:320,x1:540,base:457,size:10,t:'{nombre}'}
 ],
 firmas:[[1,62,698,95,34],[2,360,688,150,34],[9,175,428,135,32]]
};

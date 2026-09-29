// Sancor: 3 páginas de Declaración Jurada + las 30 del paquete original (se corren 3 páginas)
(function(){
 const D=3, mover=a=>a.map(x=>Array.isArray(x)?[x[0]+D].concat(x.slice(1)):Object.assign({},x,{p:x.p+D}));
 const X=()=> 'X';
 window.SANCOR = {
  campos: mover(window.CAMPOS), firmas: mover(window.FIRMAS).concat([[3,300,198,62,34]]), bloques: mover(window.BLOQUES_SANCOR),
  cajas: [
   [1,192,622,337,638,'matricula'], [1,164,599,297,617,'zonaSancor'],
   [1,262,508,561,528,'nombre'], [1,196,485,330,506,'fechaNacTxt'], [1,401,485,560,504,'estadoCivil'],
   [1,156,465,330,484,d=>'DNI '+d.dni], [1,374,462,561,481,'cuit'],
   // dirección comercial y particular (se usa el mismo domicilio)
   [1,142,396,295,415,'calleSola'], [1,349,395,378,411,'numero'], [1,410,393,432,412,'piso'], [1,465,393,564,412,'depto'],
   [1,143,377,296,395,'ciudad'], [1,354,373,563,390,'provincia'],
   [1,143,354,296,371,'cp'], [1,355,349,403,367,'telefono'], [1,450,348,563,368,'celular'], [1,144,331,297,348,'email'],
   [1,144,259,293,277,'calleSola'], [1,343,259,383,276,'numero'], [1,408,260,433,277,'piso'], [1,462,257,564,276,'depto'],
   [1,145,238,293,256,'ciudad'], [1,352,238,564,256,'provincia'],
   [1,145,215,291,232,'cp'], [1,348,216,405,233,'telefono'], [1,449,215,566,233,'celular'], [1,86,177,565,195,'email'],
   [1,137,127,292,145,'cuit'],
   // ingresos brutos
   [2,182,558,329,577,d=>d.iibbTipo==='Local'?d.provincia:''], [2,345,557,558,577,d=>d.iibbTipo==='Local'?d.iibb:''],
   [2,182,538,328,555,d=>d.iibbTipo==='Convenio Multilateral'?d.iibb:''], [2,411,535,557,554,d=>d.iibbTipo==='Convenio Multilateral'?d.iibbJur:''],
   [3,154,586,517,605,'nombre'], [3,405,607,517,624,'fechaCorta']
  ],
  marcas: [
   [1,390,618,414,632,X], [1,207,102,226,119,d=>d.iva==='MT'],
   [2,127,761,149,780,d=>d.iva==='RI'], [2,128,737,148,758,d=>d.iva==='EX'],
   [2,129,649,149,667,d=>d.ganancias==='Inscripto'], [2,129,624,148,645,d=>d.ganancias==='Exento'],
   [2,141,515,171,536,d=>d.iibbTipo==='No inscripto'], [2,140,490,171,509,d=>d.iibbTipo==='Exento'],
   // documentación que se anexa: las cartas oferta y el convenio van en este mismo PDF
   [2,89,357,118,375,X],[2,89,334,118,354,X],[2,89,312,118,328,X],[2,89,290,117,308,X],[2,89,267,118,285,X]
  ]
 };
})();

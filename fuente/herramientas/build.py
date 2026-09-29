"""Arma el sitio: index.html (todo el codigo en un archivo) + docs/<compania>.js (cada PDF base en base64).
Uso:  cd fuente/herramientas && python3 build.py      -> escribe en la raiz del repositorio (../../)
"""
import base64, os
AQUI=os.path.dirname(os.path.abspath(__file__)); F=os.path.dirname(AQUI); RAIZ=os.path.dirname(F)
leer=lambda p:open(os.path.join(F,p),encoding='utf-8').read()
b64=lambda p:base64.b64encode(open(os.path.join(F,p),'rb').read()).decode()
t=leer('plantilla/head.html')+leer('plantilla/main.js.html')
for k,f in [('F1','great-vibes'),('F2','dancing-script'),('F3','allura')]:
    t=t.replace('/*%s*/'%k,b64('vendor/fuentes/%s-latin-400-normal.woff2'%f))
t=t.replace('/*PDFLIB*/',leer('vendor/pdf-lib.min.js'))
t=t.replace('/*CONFIG*/',leer('js/sancor_campos.js')+'\n'+leer('js/sancor_bloques.js'))
t=t.replace('/*SANCOR*/','\n'.join(leer('js/'+x) for x in ['sancor.js','zurich.js','caruso.js','berkley.js','fed.js','rcfed.js','experta.js']))
t=t.replace('/*COMPANIAS*/',leer('js/companias.js')).replace('/*MOTOR*/',leer('js/motor.js')).replace('/*DOCS*/','')
open(os.path.join(RAIZ,'index.html'),'w',encoding='utf-8').write(t)
os.makedirs(os.path.join(RAIZ,'docs'),exist_ok=True)
for pdf in sorted(os.listdir(os.path.join(F,'pdf'))):
    if not pdf.endswith('.pdf') or pdf.startswith('sancor_') : continue
    k=pdf[:-4]
    open(os.path.join(RAIZ,'docs',k+'.js'),'w').write('window.DOCS=window.DOCS||{};DOCS[%r]="%s";'%(k,b64('pdf/'+pdf)))
print('listo:',os.path.getsize(os.path.join(RAIZ,'index.html')),'bytes')

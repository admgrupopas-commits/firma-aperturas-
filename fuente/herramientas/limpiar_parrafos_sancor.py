import re, subprocess, io, pikepdf, numpy as np, glob, os
from PIL import Image
from reportlab.pdfgen import canvas
src='../pdf/sancor_sin_limpiar.pdf'   # las 30 hojas originales de Sancor (paginas escaneadas ya rasterizadas)
js=open('../js/sancor_bloques.js').read()
rects=[(int(p),[float(v) for v in r.split(',')]) for p,r in re.findall(r"\{p:(\d+),limpiar:\[([\d.,]+)\]",js)]
DPI=200; S=DPI/72
for f in glob.glob('pg*.png')+glob.glob('patch_*.png'): os.remove(f)
pages=sorted(set(p for p,_ in rects))
for p in pages: subprocess.run(['pdftoppm','-r',str(DPI),'-f',str(p),'-l',str(p),'-png',src,'pg%02d'%p],check=True)
pdf=pikepdf.open(src); keep=[]
for p in pages:
    img=Image.open(glob.glob('pg%02d-*.png'%p)[0]).convert('RGB')
    H=float(pdf.pages[p-1].mediabox[3]); W=float(pdf.pages[p-1].mediabox[2])
    buf=io.BytesIO(); c=canvas.Canvas(buf,pagesize=(W,H))
    for pp,(x0,y0,x1,y1) in rects:
        if pp!=p: continue
        a=np.asarray(img.crop((int(x0*S),int(y0*S),int(x1*S),int(y1*S)))).astype(int)
        azul=(a[...,2]-np.maximum(a[...,0],a[...,1]))>40
        out=np.full_like(a,255); out[azul]=a[azul]
        fn='patch_%d_%d.png'%(p,int(y0)); Image.fromarray(out.astype('uint8')).save(fn,optimize=True)
        c.drawImage(fn,x0,H-y1,x1-x0,y1-y0)
    c.save(); ov=pikepdf.open(io.BytesIO(buf.getvalue())); pdf.pages[p-1].add_overlay(ov.pages[0]); keep.append(ov)
pdf.save('../pdf/sancor_30_limpio.pdf',compress_streams=True,object_stream_mode=pikepdf.ObjectStreamMode.generate)
print(os.path.getsize('sancor.pdf'))

"""Pasos de preparacion de los PDF base (se corren una sola vez por documento nuevo).
Cada funcion documenta lo que se hizo con cada compania. Requiere: pikepdf, reportlab, PIL, numpy.
"""
import io, pikepdf
from reportlab.pdfgen import canvas

def quitar_campos_y_redibujar_casillas(origen, destino):
    """Federacion y RC: se quitan los campos de formulario (nombres repetidos, desplegables con 'Seleccione...')
    y se vuelven a dibujar como recuadros las casillas de verificacion para que no desaparezcan."""
    src=pikepdf.open(origen); cajas={}
    for i,pg in enumerate(src.pages):
        for a in pg.obj.get('/Annots') or []:
            if a.get('/Subtype')!='/Widget': continue
            par=a.get('/Parent'); ft=a.get('/FT') or (par.get('/FT') if par is not None else None)
            r=[float(x) for x in a['/Rect']]
            if ft=='/Btn' and r[2]-r[0]<20 and r[3]-r[1]<20: cajas.setdefault(i,[]).append(r)
    pdf=pikepdf.open(origen); guardar=[]
    for i,pg in enumerate(pdf.pages):
        if '/Annots' in pg.obj: del pg.obj['/Annots']
        W=float(pg.mediabox[2]); H=float(pg.mediabox[3])
        buf=io.BytesIO(); c=canvas.Canvas(buf,pagesize=(W,H)); c.setLineWidth(0.7); c.setFillColorRGB(1,1,1)
        for x0,y0,x1,y1 in cajas.get(i,[]): c.rect(x0+0.5,y0+0.5,x1-x0-1,y1-y0-1,stroke=1,fill=1)
        c.save(); ov=pikepdf.open(io.BytesIO(buf.getvalue())); guardar.append(ov); pg.add_overlay(ov.pages[0])
    if '/AcroForm' in pdf.Root: del pdf.Root['/AcroForm']
    pdf.save(destino, compress_streams=True)

def separar_paginas(origen, destino, desde, hasta):
    """Experta: el archivo trae dos propuestas. ART = hojas 1-27, Seguros = hojas 28-48."""
    src=pikepdf.open(origen); o=pikepdf.new()
    for i in range(desde-1, hasta): o.pages.append(src.pages[i])
    o.save(destino, compress_streams=True)

def sancor_armar(ddjj_original, treinta_limpias, destino):
    """Sancor: las 3 hojas de Declaracion Jurada (sin sus campos) + las 30 hojas ya limpiadas
    con limpiar_parrafos_sancor.py (quita texto negro de los parrafos y conserva la marca de agua azul)."""
    a=pikepdf.open(ddjj_original); b=pikepdf.open(treinta_limpias); o=pikepdf.new()
    for i in range(3):
        pg=a.pages[i]
        if '/Annots' in pg.obj: del pg.obj['/Annots']
        o.pages.append(pg)
    for pg in b.pages: o.pages.append(pg)
    o.save(destino, compress_streams=True)

# Berkley: el original es Word. Se le agrego un salto de pagina antes de la tabla "PAGO DE COMISIONES"
#   (para que quede en la hoja de la firma) y se convirtio con LibreOffice:
#   soffice --headless --convert-to pdf Berkley.docx
# Rivadavia: no tiene formulario propio. La hoja se genero con reportlab a partir de su lista de requisitos
#   (ver pdf/rivadavia.pdf); las coordenadas de cada dato estan en js/companias.js (entrada 'rivadavia').
# Sancor (30 hojas): las paginas 7-12 y 24-29 venian como vectores muy pesados y se rasterizaron a JPG 150 dpi.

if __name__=='__main__':
    quitar_campos_y_redibujar_casillas('../originales/Federacion.pdf','../pdf/federacion.pdf')
    quitar_campos_y_redibujar_casillas('../originales/Federacion_RC.pdf','../pdf/rcfed.pdf')
    separar_paginas('../originales/Experta.pdf','../pdf/expertaart.pdf',1,27)
    separar_paginas('../originales/Experta.pdf','../pdf/expertaseg.pdf',28,48)

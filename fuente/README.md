# Firma de aperturas de código · Grupo PAS

Página estática (GitHub Pages) donde el productor elige compañías, carga sus datos una vez, firma y descarga
un PDF por compañía. Todo se arma en el navegador con pdf-lib; no hay servidor ni base de datos.

- `plantilla/`  HTML y lógica de la página (formulario, firma, validaciones).
- `js/`         motor de completado (`motor.js`), catálogo (`companias.js`) y la configuración de cada compañía.
- `pdf/`        documentos base ya preparados (los que usa la página).
- `originales/` documentos tal como los mandó cada compañía.
- `herramientas/build.py` arma `index.html` y `docs/*.js` en la raíz del repo.
- `herramientas/preparar_pdfs.py` y `limpiar_parrafos_sancor.py` preparan los PDF base.

Publicar: `cd fuente/herramientas && python3 build.py`, luego commit y push a `main`.
La documentación completa está en el documento de traspaso que acompaña este repositorio.

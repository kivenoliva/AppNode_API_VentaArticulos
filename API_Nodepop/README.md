# AppNode_API_VentaArticulos

Servidor implementado con Nodejs y express.
Implementa una API que dará servicio a una app de compra-venta de artículos de segunda mano.

Para poder utilizar correctamente esta API, primero escribe "npm install" en tu consola, 
para que todas las dependecias que tengas en el package.json se instalen.

A continuacion ejecuta el fichero "install_db.js", para reiniciar la base de datos, y guardar
algunos campos de ejemplo para el uso correcto de la app.

A continuación ya podrás usar correctamente tu aplicación.

# Rutas de Web

-- "/anuncios"

Pidiendo el recurso "/anuncios", obtendrás un listado con todos los anuncios disponiles, en 
esta url podrás meter filtros para obetener solo el listado de anuncios elegido por el usuario.
Las etiquetas disponibles para filtrar son: nombre, precio(pudiendo indicar un precio exacto(50), 
menor de un precio(-50), entre dos cantidades(50-100) a partir de un precio(50-)), tags, limite de anuncios,
anuncio por el que empezar (estos dos últimos para el tema de paginación), y si el artículo está en venta o no.

La url se construirá siguiendo el siguiente esquema:
http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50&start=0&limit=2&sort =precio





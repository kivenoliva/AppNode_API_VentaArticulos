/**
 * @api {get} /anuncios Obtener listado de todos los anuncios disponible.
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 *
 * @apiParam (Login) {String} pass Sólo los usuarios logueados pueden acceder a este GET.
 *                                
 *
 *
 *
 * @apiSuccess {String} id Id del producto.
 * @apiSuccess {String} nombre Nombre del producto anunciado.
 * @apiSuccess {String} venta  Devuelve true o false indicando si el producto está en venta o no.
 * @apiSuccess {String} precio  Precio que tiene el producto.
 * @apiSuccess {String} foto  Url de una imagen del producto.
 * @apiSuccess {Array} tags  Tags que corresponden a ese producto.
 * 
 *
 * @apiSuccessExample {json} Success-Response:
 *     
 *		{
 *			"result": true,
 *			"rows": [
 *				{
 *					"_id": "56ea6973e0b2c1280de9ebd4",
 *					"nombre": "Bicicleta",
 *					"venta": true,
 *					"precio": 230.15,
 *					"foto": "bici.jpg",
 *					"__v": 0,
 *					"tags": [
 *						"lifestyle",
 *						"motor"
 *					]
 *				}
 *			]
 *		}
 *
 *
 *
 * @apiError AnunciosNotFound Se ha producido algún error al obtener los anuncios de la base de datos.
 *
 * @apiErrorExample {json} Error-Response:
 *     
 *     {
 *       "result": false,
 *       "error": {error}
 *     }
 *
 */


/**
 * @api {get} /anuncios Obtener listado de anuncios utilizando distintos filtros.
 * @apiName GetAnunciosFiltros
 * @apiGroup Anuncios
 *
 * @apiParam (Login) {String} pass Sólo los usuarios logueados pueden acceder a este GET.
 *
 * @apiParam {String} [nombre]  Nombre del producto.
 * @apiParam {String} [tag]  Tag que tenga producto.
 * @apiParam {String} [venta]  Venta, true o false, para ver si está en venta el producto.
 * @apiParam {String} [precio]  Precio del producto. (50, -50, 50-, 50-1000).
 * @apiParam {String} [start]  Para paginación, mostrara anuncios a partir del número indicado.
 * @apiParam {String} [limit]  Para paginación, mostrará como máximo el número de anuncios indicado.
 * @apiParam {String} [sort]  Para ordenación, mostrará el listado de anuncios ordenado por el parámetro indicado.
 *
 *
 * @apiParamExample {url} Request-Example:
 *     /anuncios?tag=mobile&venta=false&nombre=ip&precio=50&start=0&limit=2&sort=precio
 *
 * @apiSuccess {String} id Id del producto.
 * @apiSuccess {String} nombre Nombre del producto anunciado.
 * @apiSuccess {String} venta  Devuelve true o false indicando si el producto está en venta o no.
 * @apiSuccess {String} precio  Precio que tiene el producto.
 * @apiSuccess {String} foto  Url de una imagen del producto.
 * @apiSuccess {String} tags  Tags que corresponden a ese producto.
 * 
 *
 * @apiSuccessExample {json} Success-Response:
 *     
 *		{
 *			"result": true,
 *			"rows": [
 *				{
 *					"_id": "56ea6973e0b2c1280de9ebd4",
 *					"nombre": "Bicicleta",
 *					"venta": true,
 *					"precio": 230.15,
 *					"foto": "bici.jpg",
 *					"__v": 0,
 *					"tags": [
 *						"lifestyle",
 *						"motor"
 *					]
 *				}
 *			]
 *		}
 *
 *
 *
 * @apiError AnunciosNotFound Se ha producido algún error al obtener los anuncios de la base de datos.
 *
 * @apiErrorExample {json} Error-Response:
 *     
 *     {
 *       "result": false,
 *       "error": {error}
 *     }
 *
 */





var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model("Anuncio");
var auth = require("../lib/auth");

router.use(auth()); 

router.get('/', function(req, res, next) {
	
	obj_filtro = {};

	if (req.query.tag){
		obj_filtro.tags = req.query.tag;

	}

	if (req.query.nombre){
		obj_filtro.nombre = new RegExp('^'+ req.query.nombre, 'i');

	}

	if (req.query.venta){
		obj_filtro.venta = req.query.venta;

	}

	if (req.query.precio){

		var rango = req.query.precio.split("-");
		if (rango.length == 1){
			console.log("ENTRE");
			obj_filtro.precio = rango[0];

		}else if (rango.length == 2){
			if (rango[0] === ""){
				obj_filtro.precio = { $lte: rango[1]};

			}else if(rango[1] === ""){				
				obj_filtro.precio = { $gte: rango[0]};

			}else{
				obj_filtro.precio = { $gte: rango[0], $lte: rango[1] };
			}
		}
		console.log(rango);
	}

	var init = 0;
	if (req.query.start){
		init = parseInt(req.query.start);
	}
	
	var limite = 1000;	//si no me filtran límte de devolución, mi APi por defecto devuelve 1000
	if (req.query.limit){
		limite = parseInt(req.query.limit);
	}

	var orden = "nombre";
	if (req.query.sort){
		orden = req.query.sort;
	}
	
	
	console.log("MI OBJETO CONSTRUIDO", obj_filtro);

	console.log("limite", limite);
	var query = Anuncio.find(obj_filtro).sort(orden).skip(init).limit(limite);
	query.exec(function(err, rows){
		if (err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: rows});
		return;
	});
	  
});

module.exports = router;

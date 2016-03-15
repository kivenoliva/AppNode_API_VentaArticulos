var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//require("./models/anuncios_models");
var Anuncio = mongoose.model("Anuncio");

/* Cuando me piden el recurso /anuncios, devuelvo una lista con todos los anuncios,
pueden meterme filtros para listar los anuncios, lo que hago es comprobar si me meten
alguno o no de esos filtros para filtrar la búsqueda en MongoDB. Según los criterios
de los filtros que viene explicado en el enunciado del proyecto*/
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

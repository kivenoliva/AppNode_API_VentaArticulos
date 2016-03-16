var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model("Anuncio");



router.get('/', function(req, res, next) {

	var tagsExistentes = [];

	var query = Anuncio.find({});
	query.exec(function(err, rows){
		if (err){
			res.json({result: false, err: err});
			return;
		}

		var i = 0;
		for(i = 0; i<rows.length; i++){
			console.log(rows[i].tags);
			tagsExistentes = tagsExistentes.concat(rows[i].tags);
		}

		var resultadoSinRepetir = tagsExistentes.filter(function (item, pos) {return tagsExistentes.indexOf(item) == pos});

		res.json({result: true, rows: resultadoSinRepetir});
		return;
	});
});

module.exports = router;
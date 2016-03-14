var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//require("./models/anuncios_models");
var Anuncio = mongoose.model("Anuncio");

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.query.tag){
		console.log(req.query.tag);
	}else{
		var query = Anuncio.find({});
		//var sort = req.query.sort || "nombre";
		//console.log(sort);
		//query.sort(sort);

		query.exec(function(err, rows){
			if (err){
				res.json({result: false, err: err});
				return;
			}
			console.log(rows);
			res.json({result: true, rows: rows});
			return;
		});

	}	
	  
});

module.exports = router;

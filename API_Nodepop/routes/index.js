var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model("Anuncio");
var Usuario = mongoose.model("Usuario");

/*
/* GET home page. 
router.post('/', function(req, res, next) {

	var new_anuncio = new Usuario(req.body);
    
    //Lo guardamos en la base de datos
    new_anuncio.save(function(err, newRow){
    	if(err){
    		res.json({result:false, err:err});
    		return;
    	}
    	res.json({result:true, row: newRow});
    });
  	//res.render('index', { data: 'Express' });
});
*/

router.get('/', function(req, res, next) {
  res.send('NODEPOP');
});

module.exports = router;

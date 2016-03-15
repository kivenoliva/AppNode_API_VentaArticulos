var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Usuario = mongoose.model("Usuario");
var sha256 = require("sha256");



function nombreUnico (nombre, callback){

	var query = Usuario.find({nombre: nombre});
	query.exec(function(err, rows){
		if (err){
			callback(err);
			return;
		}
		console.log(rows);
		if(rows.length == 0){
			callback(null, true);

		}else{
			callback(null, false);

		}
	});

};

function emailValido (email){

	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
		return true;
	} else {
		return false;
	}
	
};


/* GET users listing. */
router.get('/', function(req, res, next) {

	console.log(sha256("araujo"));

	var query = Usuario.find({});
	query.exec(function(err, rows){
		if (err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: rows});
		return;
	});
});

//Hago un POST para que me metan usuarios y los registros
router.post("/", function(req, res, next) {
	var nombreOK = "";
	var emailOK = "";

	//Recojo los datos que me da el POST, y los primero hasheo la contraseña
	clave_hash = sha256(req.body.clave);

	//Hago la validación del registro comprobando usuario único y el email.
	nombreUnico(req.body.nombre, function(error, result){
		if(error){
			res.json({result: false, err: err});
			return;
		}
		nombreOK = result;
		emailOK = emailValido(req.body.email);

		if(!nombreOK){
			res.json({result: false, err: "Nombre de usuario no es correcto, prueba otro"});
			return;
		}
		if(!emailOK){
			res.json({result: false, err: "El formato del email no es correcto"});
			return;
		}

		//Instanciamos objeto en memoria, SOLO en memoria
	  	var objUsuario = {
	  		nombre: req.body.nombre,
	  		email: req.body.email,
	  		clave: clave_hash
	  	}

		var new_user = new Usuario(objUsuario);
	    
	    //Lo guardamos en la base de datos
	    new_user.save(function(err, newRow){
	    	if(err){
	    		res.json({result:false, err:err});
	    		return;
	    	}
	    	res.json({result:true, row: newRow});
	    });
			return;
	});
});

module.exports = router;

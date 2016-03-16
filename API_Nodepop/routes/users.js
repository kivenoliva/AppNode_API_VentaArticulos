var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Usuario = mongoose.model("Usuario");
var sha256 = require("sha256");

/*Funcion que comprueba si el nombre ya está guardado en la base de datos*/
function nombreUnico (nombre, callback){

	var query = Usuario.find({nombre: nombre});
	query.exec(function(err, rows){
		if (err){
			callback(err);
			return;
		}
		console.log("ROWS", rows);
		if(rows.length == 0){
			callback(null, true);

		}else{
			callback(null, false);

		}
	});
};

/*Función que comprueba si el email ya está guardado en la base de datos*/
function emailUnico(email, callback){
	console.log(email);
	var query = Usuario.find({email: email});
	query.exec(function(err, rows){
		if (err){
			callback(err);
			return;
		}
		console.log("ROWS", rows);
		if(rows.length == 0){
			callback(null, true);

		}else{
			callback(null, false);

		}
	});

};

/*Función que comprueba si el formato del email introducido es correcto*/
function emailValido (email){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
		return true;
	} else {
		return false;
	}
};

/*Función que comprueba si me meten los usuarios de uno en uno*/
function unSoloUser (reqbody){

	if (reqbody.nombre instanceof Array){
		return [false, {result: false, err: "Has metido dos nombres, sólo puedes meter un usuario a la vez"}];
	}

	if (reqbody.email instanceof Array){
		return [false, {result: false, err: "Has metido dos email, sólo puedes meter un usuario a la vez"}];
	}

	if (reqbody.clave instanceof Array){
		return [false, {result: false, err: "Has metido dos claves, sólo puedes meter un usuario a la vez"}];
	}

	return[true, ""];
};

/*Función que comprueba si los campos obligatorios me los meten vacíos*/
function camposNoVacios (reqbody){

	if (reqbody.nombre === ""){
		return [false, {result: false, err: "El campo de nombre no puede ir vacío"}];
	}

	if (reqbody.email === ""){
		return [false, {result: false, err: "El campo de email no puede ir vacío"}];
	}

	if (reqbody.clave === ""){
		return [false, {result: false, err: "El campo de clave no puede ir vacío"}];
	}

	return[true, ""];
};

/*Función que comprueba si como mínimo me meten los 3 campos obligatorios*/
function camposObligatorios (reqbody){

	if (reqbody.nombre === undefined){
		return [false, {result: false, err: "Debe ir un campo nombre obligatorio"}];
	}

	if (reqbody.email === undefined){
		return [false, {result: false, err: "Debe ir un campo email obligatorio"}];
	}

	if (reqbody.clave === undefined){
		return [false, {result: false, err: "Debe ir un campo clave obligatorio"}];
	}

	return[true, ""];
}

/* GET users listing. */
router.get('/', function(req, res, next) {

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
	var emailRepetido = "";

	/*Compruebo que vienen los 3 campos obligatorios*/
	if (!camposObligatorios(req.body)[0]){
		res.json(camposObligatorios(req.body)[1]);
		return;
	}

	/*Compruebo que ningun campo de los 3 obligatorios me lo pasan vacios*/
	if (!camposNoVacios(req.body)[0]){
		res.json(camposNoVacios(req.body)[1]);
		return;
	}

	//compruebo que sólo me meten un usuario a la vez
	if (!unSoloUser(req.body)[0]){
		res.json(unSoloUser(req.body)[1]);
		return;
	}


	/*Compruebo ahora que el nombre de usuario no está cogido y si está libre,
	compruebo el email*/
	nombreUnico(req.body.nombre, function(error, result){
		if(error){
			res.json({result: false, err: err});
			return;
		}

		nombreOK = result;
		if(!nombreOK){
			res.json({result: false, err: "Ese nombre de usuario ya está en uso, prueba otro"});
			return;
		}

		/*Compruebo ahora que el email de usuario no está cogido y si está libre,
		compruebo el formato del email*/
		emailUnico(req.body.email, function(error, result){
			if(error){
				res.json({result: false, err: err});
				return;
			}

			emailRepetido = result;
			if(!emailRepetido){
				res.json({result: false, err: "Ese email ya está en uso, prueba otro"});
				return;
			}

			emailOK = emailValido(req.body.email);

		
			if(!emailOK){
				res.json({result: false, err: "El formato del email no es correcto"});
				return;
			}

			//hasheo la contraseña
			clave_hash = sha256(req.body.clave);

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
		    	return;
		    });
		});
	});
});

module.exports = router;

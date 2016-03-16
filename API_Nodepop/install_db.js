"use strict";

// Cargamos la librería
var express = require('express');
require("./lib/connectMongoose");
var fs = require("fs");
var mongoose = require('mongoose');
require("./models/anuncios_models");
var Anuncio = mongoose.model("Anuncio");
require("./models/usuarios_models");  
var Usuario = mongoose.model("Usuario");
var async = require("async");


//Lo primero borro lo que haya en la base de datos
Anuncio.remove({}, function(err) {
    if (err) {
        return console.error("ERROR AL ELIMINAR ANUNCIOS"); 
    }
    console.log("ELIMINADO ANUNCIOS");
    // Leo el fichero anuncios.json para inicializar la base de datos
	fs.readFile("./models/anuncios.json", {encoding:"utf8"}, function(error, data){
		if(error){
			console.error("Error al leer el fichero anuncios.json", error);
			return;
		}

		var data = JSON.parse(data);

		//Aqui tengo el fichero leído, ahora guardo lo obtenido
		//en la base de datos.

		//Cuidado porque creo que estamos en llamadas asíncronas, al guardar
		//en la base de datos estamos haciendo algo asíncrono, por tanto utilizo
		//Un bucle asíncrono de la libreria asyn para intentar guardar en paralelo
		//todas las cosas que tenga y cuando termine que me avise. Creo...

		var i = 0;
		for (i = 0; i< data.anuncios.length; i++) {

			var new_anuncio = new Anuncio(data.anuncios[i]);
			new_anuncio.save(function(err, newRow){
		    	if(err){
		    		//res.json({result:false, err:err});
		    		console.error("ERROR AL GUARDAR ANUNCIO");
		    		return;
		    	}
		    	//res.json({result:true, row: newRow});
		    	console.log("GUARDADO ANUNCIO");
		    });
		}
	});
});

Usuario.remove({}, function(err) {
    if (err) {
        return console.error("ERROR AL ELIMINAR USUARIOS"); 
    }
    console.log("ELIMINADO USUARIOS");
    // Leo el fichero usuarios.json para inicializar la base de datos
	fs.readFile("./models/usuarios.json", {encoding:"utf8"}, function(error, data){
		if(error){
			console.error("Error al leer el fichero usuarios.json", error);
			return;
		}

		var data = JSON.parse(data);

		//Aqui tengo el fichero leído, ahora guardo lo obtenido
		//en la base de datos.

		//Cuidado porque creo que estamos en llamadas asíncronas, al guardar
		//en la base de datos estamos haciendo algo asíncrono, por tanto utilizo
		//Un bucle asíncrono de la libreria asyn para intentar guardar en paralelo
		//todas las cosas que tenga y cuando termine que me avise. Creo...
		
		var i = 0;
		for (i = 0; i< data.usuarios.length; i++) {

			var new_user = new Usuario(data.usuarios[i]);
			new_user.save(function(err, newRow){
		    	if(err){
		    		//res.json({result:false, err:err});
		    		console.error("ERROR AL GUARDAR USUARIOS");
		    		return;
		    	}
		    	//res.json({result:true, row: newRow});
		    	console.log("GUARDADO USUARIO");
		    	
		    });
		}
	});
});

//process.exit para terminar
//process.exit(1) lo para recibes que ha habido un error
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

//Promesa que borra la base de datos de los anuncios.
var deleteAnuncios = function (){

	return new Promise(function(resolve, reject) {
		Anuncio.remove({}, function(err) {
		    if (err) {
		    	reject(new Error("ERROR AL ELIMINAR ANUNCIOS"));
		        return;
		    }
		    console.log("ELIMINADO ANUNCIOS");
		    resolve();
			return;
		});
	});
};

//Promesa que borra la base de datos de los anuncios.
var deleteUsuario = function (){

	return new Promise(function(resolve, reject) {
		Usuario.remove({}, function(err) {
		    if (err) {
		    	reject(new Error("ERROR AL ELIMINAR USUARIOS"));
		        return;
		    }
		    console.log("ELIMINADO USUARIOS");
		    resolve();
			return;
		});
	});
};

var leerFicheroAnuncios = function(){

	return new Promise(function(resolve, reject) {
		fs.readFile("./models/anuncios.json", {encoding:"utf8"}, function(error, data){
			if(error){
				reject(new Error("Error al leer el fichero anuncios.json", error));
				return;
			}

			var data = JSON.parse(data);
			console.log("LEIDO FICHERO ANUNCIOS");
			resolve(data);
		});
	});
};

var leerFicheroUsuarios = function(){

	return new Promise(function(resolve, reject) {
		fs.readFile("./models/usuarios.json", {encoding:"utf8"}, function(error, data){
			if(error){
				reject(new Error("Error al leer el fichero usuario.json", error));
				return;
			}

			var data = JSON.parse(data);
			console.log("LEIDO FICHERO USUARIOS");
			resolve(data);
		});
	});
};
	
var saveAnuncios = function(data){
	
	return new Promise(function(resolve, reject) {
	
		
		async.each(data.anuncios, function(data, cb) {
			var new_anuncio = new Anuncio(data);
			new_anuncio.save(function(err, newRow){
		    	if(err){
		    		//res.json({result:false, err:err});
		    		console.log("ERROR AL GUARDAR ANUNCIO");
		    		cb();
		    		return;
		    	}
		    	//res.json({result:true, row: newRow});
		    	console.log("GUARDADO ANUNCIO");
		    	cb();
		    });


		}, function(err){
		    // if any of the file processing produced an error, err would equal that error
		    if( err ) {
		      // One of the iterations produced an error.
		      // All processing will now stop.
		      console.log("ERROR Al final de async.each");
		      reject();
		    } else {
		      console.log("Finalizado async.each");
		      resolve(data);
		    }
		});
		
	});

};

var saveUsuarios = function(data){
	
	return new Promise(function(resolve, reject) {
	
		
		async.each(data.usuarios, function(data, cb) {
			var new_user = new Usuario(data);
			new_user.save(function(err, newRow){
		    	if(err){
		    		//res.json({result:false, err:err});
		    		console.error("ERROR AL GUARDAR USUARIOS");
		    		cb();
		    		return;
		    	}
		    	cb();
		    	
		    });


		}, function(err){
		    // if any of the file processing produced an error, err would equal that error
		    if( err ) {
		      // One of the iterations produced an error.
		      // All processing will now stop.
		      console.log("ERROR Al final de async.each");
		      reject();
		    } else {
		      resolve(data);
		    }
		});
		
	});

};



deleteAnuncios()
	.then(leerFicheroAnuncios)
	.then(saveAnuncios)
	.then(deleteUsuario)
	.then(leerFicheroUsuarios)
	.then(saveUsuarios)
	
	.then( function(resultado) {
		console.log("FIN");
		process.exit();
	})
	.catch( function(error) {
		console.log("ERROR EN PROMESAS");
		process.exit(1);
	});



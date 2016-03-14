"use strict";

var mongoose = require('mongoose');

//Creo el esquema que tendrá un anuncio 
var anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});

var Anuncio = mongoose.model("Anuncio", anuncioSchema);
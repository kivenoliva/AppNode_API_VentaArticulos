var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model("Anuncio");
var Usuario = mongoose.model("Usuario");



router.get('/', function(req, res, next) {
  res.send('Estas en tags');
});

module.exports = router;
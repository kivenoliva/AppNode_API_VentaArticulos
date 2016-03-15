"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var basicAuth = require("basic-auth");
var Usuario = mongoose.model("Usuario");
var sha256 = require("sha256");


//Función que hace la labor de autentificar y que devuelvo a app.js cuando la requiere
//app.js la requerirá al principio en este caso, porque necesitamos estar autenticados 
// para hacer cualquier cosa en nuestra web.
var fn = function(){

    return  function(req, res, next){
                
        var user = basicAuth(req); //Esto es lo que me hace el módulo, sacar el usuario y dármelo

        user = user || "";
        //Ahora tengo el usuario y voy a controlar si lo tengo en la base de datos
        var userEnter = user.name || "";
        var query = Usuario.find({nombre: userEnter});
        
        query.exec(function(err, rows){
            if (err){
                console.error(err);
                return;
            }

            //Ha ido bien la búsqueda, puede que me den resultados o no.
            if (rows.length === 0){
                console.log("Ese usuario no está en la base de datos");
                res.set("WWW-Authenticate", "Basic realm=Authorization Required"); //---> Escribe en la cabecera.
                res.send(401);
                return;

            }else{
                console.log("El usuario está en la base de datos, comprobamos su contraseña");

                //Ha encontrado al usuario en la base de datos, por tanto comprobamos si la contraseña coincide

                //hasheo la contraseña metida
                var passEnter_hash = sha256(user.pass);

                /*Siempre va a devolver 1 solo en el array, porque en el registro controlo que no haya dos usuarios con el
                mismo nombre*/
                var passUserDB = rows[0].clave;  

                if ( passEnter_hash !== passUserDB){
          
                    res.set("WWW-Authenticate", "Basic realm=Authorization Required"); //---> Escribe en la cabecera.
                    res.send(401);
                    return;
                };
                
            }
            next();
        });
    };
};


module.exports = fn;
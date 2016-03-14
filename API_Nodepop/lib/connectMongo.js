"use strict";

var client = require("mongodb").MongoClient;
var dbConnection = {
	db: null
};

client.connect('mongodb://localhost:27017/Nodepop_DataBase', function(err, db) {
	if (err) {

		console.error("Can not connect to database");
		process.exit(1);

	}	
	dbConnection.db = db;
});

module.exports = dbConnection;
var mongodb = require('mongodb');
var Db = mongodb.Db;
var MongoClient = mongodb.MongoClient;
var Server = mongodb.Server;

module.exports = MongoLayer;

function MongoLayer(config) {
	config = config || {};

	this.dbname = config.dbname || 'test';

	this.db = new Db(this.dbname, new Server(
				'localhost', 27017));
}

MongoLayer.prototype.withConnection = function(callback) {
	this.db.open(function(err, db) {
		if (err !== null) {
			console.log('Error opening MongoDB connection');
			return false;
		}

		callback(db);

		this.db.close();

		return true;
	});
};

MongoLayer.prototype.on = function(eventType, callback, db) {
	// TODO
};

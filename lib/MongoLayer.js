(function (node) {


var mongodb = require('mongodb');
var Db = mongodb.Db;
var MongoClient = mongodb.MongoClient;
var Server = mongodb.Server;

module.exports = MongoLayer;


function MongoLayer(config) {
    config = config || {};

    this.dbName = config.dbName || 'test';  // TODO
    this.collectionName = config.collectionName || 'foo';  // TODO

    this.db = new Db(this.dbName, new Server(
                'localhost', 27017));

    this.activeDb = null;
    this.activeCollection = null;
}


MongoLayer.prototype.connect = function(callback) {
    var that = this;

    // TODO: drop db param from callback
    this.db.open(function(err, db) {
        if (err !== null) {
            console.log('Error opening MongoDB connection:', err);
            return;
        }

        that.activeDb = db;

        db.collection(that.collectionName, function(err, collection) {
            if (err !== null) {
                console.log("Error opening collection '" +
                    that.collectionName + "':", err);
                return;
            }

            that.activeCollection = collection;

            callback(db);
        });
    });
};

MongoLayer.prototype.disconnect = function() {
    if (this.activeDb) this.activeDb.close();
};

MongoLayer.prototype.store = function(data) {
    // TODO: queue request if not connected
    if (this.activeCollection) {
        this.activeCollection.insert(data);
    }
};

// TODO: test this method
MongoLayer.prototype.on = function(eventType, callback) {
    var that = this;

    node.events.ng.on(eventType, function(msg) {
        that.store(callback(msg));
    });
};


})('undefined' !== typeof node ? node : module.parent.exports);

var mongodb = require('mongodb');
var Db = mongodb.Db;
var MongoClient = mongodb.MongoClient;
var Server = mongodb.Server;

module.exports = MongoLayer;


function MongoLayer(node, config) {
    config = config || {};

    this.node = node;

    this.dbName = config.dbName || 'test';  // TODO
    this.collectionName = config.collectionName || 'foo';  // TODO

    this.db = new Db(this.dbName, new Server(
                'localhost', 27017));

    this.activeDb = null;
    this.activeCollection = null;
}


MongoLayer.prototype.connect = function(callback) {
    var that = this;
    this.db.open(function(err, db) {
        if (err !== null) {
            that.node.err('Error opening MongoDB connection: ' + err);
            return;
        }

        that.activeDb = db;

        db.collection(that.collectionName, function(err, collection) {
            if (err !== null) {
                that.node.err("Error opening collection '" +
                    that.collectionName + "': " + err);
                return;
            }

            that.activeCollection = collection;

            callback();
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
    
    this.node.events.ng.on(eventType, function(msg) {
        that.store(callback(msg));
    });
};

MongoLayer.prototype.getDbObj = function() {
    return this.activeDb;
};

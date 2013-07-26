/**
 * # nodeGame-mongodb
 * 
 * MongoDB component for nodeGame
 * 
 * http://www.nodegame.org
 * 
 * ---
 * 
 */

module.exports.NGM = require('./lib/MongoLayer.js');

// here the Layer takes the node reference from
module.exports.node = module.parent.exports.node;
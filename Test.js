var node = require('../nodegame-client/index.js');
module.exports.node = node;

node.setup('nodegame',{}); // should not be necessary, it also wants the empty object

var NGM = require('nodegame-mongodb').NGM;

var ngm = new NGM();

ngm.on('AHAH', function(a) {
    return {
        ahah_2: a
    };
});


ngm.connect(function(db) {
    console.log('Connected');


    var collection = db.collection('foo');
    collection.find().toArray(function(err, data) {
        console.log('data in foo:', data);
        console.log();

        var randNum = Math.random();

        console.log('storing value ' + randNum);

        ngm.store({rand: randNum});

        debugger;
        
        node.on('AHAH', function(a){
            ngm.store({ahah: a});
        });

        node.emit('AHAH', '??');


        ngm.disconnect();
    });
});

/*
ngm.on('in.set.DATA', function(msg) {
    return {
        player: msg.from,
        value:  msg.data,
        key:    msg.key,
        time:   getTime()
    };
});
*/

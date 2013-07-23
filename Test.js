var NGM = require('nodegame-mongodb').NGM;

var ngm = new NGM();

ngm.connect(function(db) {
    console.log('Connected');

    var collection = db.collection('foo');
    collection.find().toArray(function(err, data) {
        console.log('data in foo:', data);
        console.log();

        var randNum = Math.random();

        console.log('storing value ' + randNum);

        ngm.store({rand: randNum});

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

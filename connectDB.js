var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;

var url = `mongodb://${user}:${pass}@ds163232.mlab.com:63232/semaphore-v2`;

module.exports = function(cb) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(err, null);
        console.log('Connected correctly to server!');

        // return db object;
        cb(db);
    })
}
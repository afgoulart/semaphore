var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var user = process.env.MONGO_USER;
var pass = process.env.MONGO_PASS;
var host = process.env.MONGO_HOST;
var port = process.env.MONGO_PORT;
var dbname = process.env.MONGO_DB_NAME;

// var url = `mongodb://${user}:${pass}@ds163232.mlab.com:63232/semaphore-v2`;
var url = `mongodb://${user}:${pass}@${host}:${port}/${dbname}`;

module.exports = function(cb) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(err, null);
        console.log('Connected correctly to server!');

        // return db object;
        cb(db);
    })
}
var express = require('express');
var morgan = require('morgan')('dev');
var connetDB = require('./connectDB');
var collectionRouter = require('./routes/collection');

var hostname = process.env.hostname || 'localhost';
var port = process.env.hostname || 3000;

var server = express();
server.use(morgan);

connetDB(function(db) {
  server.use('/:collection', collectionRouter(db));
})

server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});
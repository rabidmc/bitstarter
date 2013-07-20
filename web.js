var express = require('express');
var fs = require('fs');

var buffer = fs.readFileSync('./index.html');
var words = buffer.toString('utf8');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(words);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

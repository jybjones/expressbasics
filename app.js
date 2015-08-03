var express = require('express');
var app = express(); //executing Express and named app
// var app = require('express')();--> same thing in ONE line

app.use(express.static('public'));

app.get('/', function (req, res) { //get method at route, and callback method where you get access to req & res
  res.send('Hello World!');
});

// The first one it comes to is the one executed. The 'this is root' wont show//
app.get('/', function (req, res) {
  res.send('This is the Root!');
});

app.use(function(req, res) {
  res.status(403);
  res.send('Unauthorized!!');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

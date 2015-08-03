var express = require('express');
var app = express(); //executing Express and named app
// var app = require('express')();--> same thing in ONE line
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  ///logging at the top
  console.log('Request at ' + new Date().toISOString());
  next(); //call next for middleware WHEN there's other things after! OTherwise, chain will end
});

app.use(express.static('public'));

app.get('/', function (req, res) {
//get method at route, and callback method where you get access to req & res
  res.send('Hello World!');
});

// app.get('/pizza/:topping/:qty', function (req, res) {
//   res.send(req.params);
  ///REQ.PARAMS is an object params
  //on page you see: http://localhost:3000/pizza/pepperoni/1
// });

app.get('/pizza/:topping/:qty', function (req, res) {
  var obj = req.params;
  obj.title = 'Pizza Shop';
  res.render('templates/pizza', obj);
});

// The first one it comes to is the one executed. The 'this is root' wont show//
// app.get('/', function (req, res) {
//   res.send('This is the Root!');
// });
app.get('/awesomethings', function (req, res) {
  setTimeout(function (){
    var awesomeThings = [
    'Pizza',
    'Bacon',
    '2nd Amendment',
    'Pluto',
    'Space Jam'
  ];
  res.render('templates/world',
    { title: 'Awesomesite.com',
       welcome: 'Thanks for coming by!',
       awesomeThings: awesomeThings
     }
    );
  }, 5000);
});

app.get('/test', function (req, res, next) {
  res.write('Test1');
  next();
});

app.get('/test', function (req, res) {
  res.end('Test2');
});

app.get('/json', function (req, res) {
  res.send({an: 'object'});
});

////Get an error one here////
app.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

app.use(function(req, res) {
  res.status(403).send('Unauthorized!!');
});

////NEED to pass 4 ARGUMENTS to create an error handling!!!
app.use(function (err, req, res, next) {
  console.log('ERRRRRR', err.stack);
  res.status(500).send('My Bad')
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

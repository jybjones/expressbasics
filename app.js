//npm requires//
var express = require('express');

//file requires//
var routes = require('./routes/index');
var pizza = require('./routes/pizza');

//variables//
var app = express();

//settings//
app.set('view engine', 'ejs');
app.set('case sensitive routing', true); //makes it case sensitive
app.set('strict routing', true);

//locals GOOD for Titles, All Templates have access to this!//
// app.locals.title = "My Awesome App";
app.locals.title = 'aweso.me';

//middlewares//
app.use(function(req, res, next) {
  console.log('Request at ' + new Date().toISOString());
  next(); //call next for middleware WHEN there's other things after! OTherwise, chain will end
});

app.use(express.static('public'));

///routes//
app.use('/', routes);
app.use('/pizza', pizza);

//errors//
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

//npm requires//
var fs = require('fs');
var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var loggly = require('loggly');

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
app.use(lessCSS('public')); //attach middleware that will handle request

//create a stream//
var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream})); //outputs to file
app.use(morgan('dev')); //terminal

var client = loggly.createClient({
    token: "8c98ff23-bef1-4f92-8696-3108998ef509",
    subdomain: "jenniferjones",
    tags: ["NodeJS"],
    json:true
});

app.use(function (req, res, next) {
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
  });
  next();
});

// app.use(function(req, res, next) {
//   console.log('Request at ' + new Date().toISOString());
//   next(); //call next for middleware WHEN there's other things after! OTherwise, chain will end
// });
app.use(express.static('public'));


///routes//
app.use('/', routes);
app.use('/pizza', pizza);

//errors//
app.use(function(req, res) {
  res.status(403).send('Unauthorized!!');
});

///////LOGGLY to test ERRORS/////
app.use(function (req, res, next) {
  client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method,
    err: err
  });
  next();
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

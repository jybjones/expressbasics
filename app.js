//npm requires/packages we need//
var fs = require('fs');
var express = require('express');
var lessCSS = require('less-middleware');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');


//file requires//
var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var chickennuggets = require('./routes/chickennuggets');
var imgur = require('./routes/imgur');
var user = require ('./routes/user');

//__________Executing the App here!________////
var app = express();

// include the secrets tokens//
// require('./lib/secrets');
if (process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}

require('./lib/mongodb'); //makes the global database available

//__________settings, routng defaults________//
app.set('view engine', 'ejs');
app.set('case sensitive routing', true); //makes it case sensitive
app.set('strict routing', true);

//locals GOOD for Titles, All Templates have access to this!//
// app.locals.title = "My Awesome App";
app.locals.title = 'aweso.me';
// res.locals.user = null; //need to set this to ONLY get routes for user

//__________________middlewares___________________________///////
app.use(session({
  secret: 'expressbasicsisareallyawesomeapp',
  resave: false,
  saveUninitialized: true
}));

app.use(lessCSS('www/stylesheets')); //attach middleware that will handle request
app.use(bodyParser.urlencoded({extended: false})); //this is for FORMS!!!

//________________create a stream____________________//
var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream})); //outputs to file
app.use(morgan('dev')); //terminal


app.use(function (req, res, next) {
  var client = require('./lib/loggly')('incoming');
   client.log({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  });
  next();
});

//_____Middleware function checking login, fires every request_____________///
app.use(function getAuthStatus (req, res, next) {
  // if (req.session.user) {
  //   res.locals.user = req.session.user;
  // } else {
  //   res.locals.user = null;
  // }
    // res.locals.user = req.session.user ? req.session.user : null;
    res.locals.user = req.session.user || null;
    next();
});

///____________routes that need login__________________//
app.use('/', routes);
app.use('/user', user);
app.use(express.static('www'));

app.use(function requireAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/user/login');
    }
    // req.session.count += 1;
    //   console.log('SESSION>>>>>>>>>>>', req.session);
    //   console.log(req.sessionID);
    // next();
  });

  // app.use(function(req, res, next) { //regenerate a NEW session ID cookie//
  //   req.session.regenerate(function () {
  //     console.log('SESSION>>>>>>>>>>>', req.session);
  //   next();
  // });

// });

///____________routes__________________//
app.use('/pizza', pizza);
app.use('/chickennuggets', chickennuggets);
app.use('/imgur', imgur);


//errors//
app.use(function(req, res) {
  res.status(403).send('Unauthorized!!');
});

///__________LOGGLY to test ERRORS________________/////
app.use(function (err, req, res, next) {
  var client = require('./lib/loggly')('error');
    client.log({
      ip: req.ip,
      date: new Date(),
      url: req.url,
      status: res.statusCode,
      method: req.method,
      stackTrace: err.stack
  });

////NEED to pass 4 ARGUMENTS to create an error handling!!!
// app.use(function (err, req, res, next) {
  console.log('ERRRRRR', err.stack);
  res.status(500).send('My Bad')
});

/////______________Server!!!!!___________________///////
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%d', host, port);
});

////_____make this available----////
module.exports = app;

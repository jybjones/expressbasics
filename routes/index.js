var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
//get method at route, and callback method where you get access to req & res
  res.send('Hello World!');
});

router.get(/hello/, function (req, res) {
  res.send('Hello');
});

// The first one it comes to is the one executed. The 'this is root' wont show//
// app.get('/', function (req, res) {
//   res.send('This is the Root!');
// });
router.get('/awesomethings', function (req, res) {
  var collection = global.db.collection('awesomeThings');
    collection.find().toArray(function(err, things) {
      res.render('templates/world',
      {
        welcome: 'Thanks for coming!',
        awesomeThings: things //make SURE THIS matches the Mongo Shell data
      }
        );
      });
    });

//    setTimeout(function (){
//     var awesomeThings = [
//     'Pizza',
//     'Bacon',
//     '2nd Amendment',
//     'Pluto',
//     'Space Jam'
//   ];
//   res.render('templates/world',
//     {  welcome: 'Thanks for coming by!',
//        awesomeThings: awesomeThings
//      }
//     );
//   }, 5000);
// });

router.get('/test', function (req, res, next) {
  res.write('Test1');
  next();
});

router.get('/test', function (req, res) {
  res.end('Test2');
});

router.get('/json', function (req, res) {
  res.send({an: 'object'});
});

////Get an error one here////
router.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

module.exports = router;

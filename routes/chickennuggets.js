var express = require('express');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();


//get function want a new template!//
router.get('/', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
  collection.find().toArray(function(err, orders) {
    var formattedOrders = orders.map(function (order) {
      return {
        _id:       order._id,
        name:      order.name,
        flavor:    order.style,
        qty:       order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow()
      };
    });
    res.render('templates/chicken-index', {orders: formattedOrders}); //this is the list of orders
  });
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new'); //order form
});

router.post('/order', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
    collection.save(req.body, function(){
      res.redirect('/chickennuggets');
    });
  });

  // console.log(req.body);
  // res.send('Thanks for ordering!');
//   res.redirect('/'); ////redirected to Hello World after placing order
// });
router.post('/order/:id/complete', function (req, res) {
  var collection = global.db.collection('chickenNuggets');
    collection.update(
      {_id:     ObjectID(req.params.id)},
      {$set:    {complete: true}},
      function(){
        res.redirect('/chickennuggets')
    });
  });

router.post('/order/:id/complete', function(req, res) {
  var collection = global.db.collection('chickenNuggets');
  collection.find().toArray(function(err, complete) {
    var complete = orders.map(function (order) {
      if(complete === true) {
      return {_id: ObjectID(req.params.id)};
    }
    });
    res.render('/chickennuggets', {complete: 'true'}); //this is the list of orders
  });
});

module.exports = router;

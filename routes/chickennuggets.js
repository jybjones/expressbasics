var express = require('express');
var moment = require('moment');
// var ObjectID = require('mongodb').ObjectID;
var Order = require('../models/ChickenNuggets');
var router = express.Router();

///////_____./ is to tell Node NOT in Node-Modules FOlder!!___
// var ChickenNuggets = require('../models/ChickenNuggets');
router.get('/', function (req, res) {
  var id = req.session.user._id;

  Order.findAllByUserId(id, function (err, orders) {
    res.render('templates/chicken-index', {orders: formatAllOrders(orders)});
  });

  function formatAllOrders(orders) {
    return orders.map(function (order) {
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  }
});


///////////___________ORIGINAL before REFACTORING______________////////
//get function want a new template!//
  // var collection = global.db.collection('chickenNuggets');
  // collection.find().toArray(function(err, orders) {
  //   var formattedOrders = orders.map(function (order) {
  //     return {
  //       _id:       order._id,
  //       name:      order.name,
  //       flavor:    order.style,
  //       qty:       order.qty,
  //       createdAt: moment(order._id.getTimestamp()).fromNow()
  //     };
  //   });

    // res.render('templates/chicken-index', {orders: formattedOrders}); //this is the list of orders
    //  });
  // });

router.get('/order', function (req, res) {
  res.render('templates/chicken-new'); //order form
});

router.post('/order', function (req, res) {
  var o = req.body;
  o.userId = req.session.user._id;

  Order.create(o, function () {
    res.redirect('/chickennuggets');
  });
  });

router.post('/order/:id/complete', function (req, res) {
  Order.findById(req.params.id, function(err, order) {
    order.complete(function () {
    res.redirect('/chickennuggets');
  });
  });
});


module.exports = router;
  // var order = new Order(req.body);
  // order.save(function () {
  //   res.redirect('/chickennuggets');


  // var collection = global.db.collection('chickenNuggets');
  //   collection.save(req.body, function(){
  //     res.redirect('/chickennuggets');
  //   });
  // });

  // console.log(req.body);
  // res.send('Thanks for ordering!');
//   res.redirect('/'); ////redirected to Hello World after placing order
// });



// router.post('/order/:id/complete', function(req, res) {
//   var collection = global.db.collection('chickenNuggets');
//   collection.find().toArray(function(err, complete) {
//     var complete = orders.map(function (order) {
//       if(complete === true) {
//       return {_id: ObjectID(req.params.id)};
//     }
//     });
//     res.render('/chickennuggets', {complete: 'true'}); //this is the list of orders
//   });
// });

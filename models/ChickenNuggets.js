//////________Factory Pattern,
var _ = require('lodash');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

//////____ADD additinal properties for DB_______
function Order(o) {
  this.name = o.name;
  this.style = o.style;
  this.qty = o.qty;
  this.createdAt = new Date();
  this.complete = false;
  this.cost = this.qty * 0.25;
}

// Order.collection = global.db.collection('chickenNuggets');
Object.defineProperty(Order, 'collection', {
  get: function () {
    return global.db.collection('chickenNuggets');
  }
});

Order.prototype.save = function (cb) {
  Order.collection.save(this, cb);
}

Order.prototype.complete = function (cb) {
  Order.collection.update(
    {_id: this._id},
    {$set: {complete: true}}
  , cb);
}

Order.findById = function(id, cb) {
  Order.collection.find({_id: ObjectID(id)}, function(err, order) {
    // cb(err,  _.create(Order.prototype, order));
    cb(err, setPrototype(order));
  });
};

//////all this function does is grab from database!!////
Order.findAll = function (cb) {
  Order.collection.find().toArray(function (err, orders) {
    var prototypedOrders = orders.map(function (order) {
      return setPrototype(order);
    });
    cb(err, prototypedOrders);
  });
  };

  module.exports = Order;

  function setPrototype(pojo) {
    return _.create(Order.prototype, pojo);
  }


/////____-ORIGINAL from the Routes________//////
// router.post('/order/:id/complete', function (req, res) {
//   var collection = global.db.collection('chickenNuggets');

//   collection.update(
//     {_id: ObjectID(req.params.id)},
//     {$set: {complete: true}},
//     function () {
//       res.redirect('/chickennuggets')
//     });
// });
// function ChickenNuggets(){}
//Could have been ChickenNuggets = {};


//_______ collection.find().toArray(function (err, cb) {
//   cb(err, cb);
// });
// _______is the same as:______
// collection.find().toArray(cb);

// function formatOrders(orders) {
//   var formattedOrders = orders.map(function (order) {
//       return {
//         _id:       order._id,
//         name:      order.name,
//         flavor:    order.style,
//         qty:       order.qty,
//         createdAt: moment(order._id.getTimestamp()).fromNow()
//       };
//     });
//   return formattedOrders;
// }

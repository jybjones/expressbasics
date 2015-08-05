var express = require('express');
var router = express.Router();

// router.get('/:topping/:qty', function (req, res) {
  router.get('/', function (req, res) {
    var obj = {
      qty: req.query.qty || 1,
      topping: req.query.topping || 'cheese'
    };
    console.log(req.query);

    res.render('templates/pizza', obj);
  });


module.exports = router;

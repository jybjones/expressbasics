//---2 routes needed: new and create///
var express = require('express');
var router = express.Router();

var User = require('../models/User');

//___create new route for register page______/////
router.get('/new', function newUser(req, res) {
  res.render('user/new');
});

router.post('/', function createUser(req, res) {
  //perform registration here!////
  console.log(req.body);
  User.create(req.body, function(err) {
    if (err) {
      res.render('user/new', {err: err});
    } else {
      res.redirect('/');
    }
  });

})








module.exports = router;

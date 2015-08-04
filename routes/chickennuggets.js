var express = require('express');
var router = express.Router();

//get function want a new template!//
router.get('/', function (req, res) {
  res.render('templates/chickennuggets');
});

router.post('/order', function (req, res) {
  console.log(req.body);
  // res.send('Thanks for ordering!');
  res.redirect('/'); ////redirected to Hello World after placing order
});


module.exports = router;

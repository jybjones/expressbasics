//////____Database User Model ________/////////
var bcrypt = require('bcrypt');
function User(u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;
  // this.hashedPassword = ????////
  //this.hashedPassword =
}

User.create = function(u, cb) {
  if (u.password !== u.password_confirm) {
    cb('Passwords do not match');
  }

    bcrypt.hash(u.password, 8, function(err, hash) {
      u.hashedPassword = hash;
      var user = new User(u);
      // console.log(hash);
      User.collection.save(user, cb);
    });
};
///////______this will prob be in EVERY model you create!!______//////
Object.defineProperty(User, 'collection', {
  get: function() {
    return global.db.collection('user');
  }
});

module.exports = User;

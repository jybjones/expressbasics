//////____Database User Model ________/////////
var bcrypt = require('bcrypt');
var _ = require('lodash');

function User(u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;
  // this.hashedPassword = ????////
  //this.hashedPassword =
}

User.findByEmail = function (email, cb) {
  User.collection.findOne({email: email}, function (err, user) {
    cb(err, setPrototype(user));
  });
};

User.login = function (u, cb) {
  User.findByEmail(u.email, function(err, user) {
  if (user) {
      bcrypt.compare(u.password, user.hashedPassword, function(err, match) {
        if (match) {
          //login user. Null = no error//
          console.log('user should be: ' + user);
          cb(null, user);
        } else {
          ////bad password or error
          cb('Bad Email or Password!')
        }
      });
    } else {
      ///bad email
      cb('Bad Email or Password!')
    }
  });
}

// User.login = function (u, cb) {
//   User.collection.findOne({email: u.email}, function(err, user) {
//     //___check if user exists first__//
//     if (user) {
//       bcrypt.compare(u.password, user.hashedPassword, function(err, match) {
//         if (match) {
//           //login user. Null = no error//
//           cb(null, user);
//         } else {
//           ////bad password or error
//           cb('Bad Email or Password!')
//         }
//       });
//     } else {
//       ///bad email
//       cb('Bad Email or Password!')
//     }
//   });
// }

User.create = function(u, cb) {
  if (u.password !== u.password_confirm) {
    cb('Passwords do not match');
  }

    bcrypt.hash(u.password, 8, function(err, hash) {
      u.hashedPassword = hash;
      var user = new User(u);
      // console.log(hash);
      user.save(cb);
    });
};

User.prototype.save = function(cb) {
  User.collection.save(this, cb);
};
///////______this will prob be in EVERY model you create!!______//////
Object.defineProperty(User, 'collection', {
  get: function() {
    return global.db.collection('user');
  }
});

module.exports = User;

function setPrototype(pojo) {
  return _.create(User.prototype, pojo);
}

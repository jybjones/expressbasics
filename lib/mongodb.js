var mongo = require('mongodb').MongoClient;

  if (!global.db) {
    //this is the url of the app we are working in
  mongo.connect('mongodb://localhost:27017/express_basics', function(err, db){
    global.db = db;
  });
 }



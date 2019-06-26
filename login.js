

exports.check = function(ueemail, uepassword)
{
    var uemail="nikhilk839";
    var upassword="sss";
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://localhost:27017/ethereumpharma";

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);

            var collection = db.collection('user');

            collection.findOne({ email: uemail, password: upassword }, function(err, doc){
                if(err) throw err;
                if(doc) {
                    console.log("Found: " + uemail + ", pass=" + upassword);
                } else {
                    console.log("Not found: " + uemail);
                }
                db.close();
            });
        }
    });
}
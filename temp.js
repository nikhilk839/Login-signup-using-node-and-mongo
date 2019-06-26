exports.check = function(uid, upass)
{
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://localhost:27017/ethereumpharma";

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);

            var collection = db.collection('employees');

            collection.findOne({ id: uid, pass: upass }, function(err, doc){
                if(err) throw err;
                if(doc) {
                    console.log("Found: " + uid + ", pass=" + upass);
                } else {
                    console.log("Not found: " + uid);
                }
                db.close();
            });
        }
    });
}


var http = require('http');
var fs= require('fs');
var querystring= require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/ethereumpharma";

http.createServer(function (req,res){
    if(req.url === "/index")
    {
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("./index.html","UTF-8").pipe(res);
    }
    if(req.method === "POST"){
        var data="";
        req.on("data", function(chunk){
            data += chunk;
        });
        req.on("end", function(chunk)
        {
            var r = querystring.parse(data);
            // MongoClient.connect(url, { useNewUrlParser: true });
            MongoClient.connect(url,function(err,db)
            {
                if(err) throw err;
                var q = querystring.parse(data);
                db.collection('user').findOne({id:q["id"] ,pass:q["pass"]}, function(err,res)
                {
                    if(err) throw err;
                    console.log("pass":q["pass"]);
                    db.close();
                });
            })
        });

    }
}).listen(3000);
var http = require('http');
var fs= require('fs');
var querystring= require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/ethereumpharma";
var uemail="";
var upassword="";
// res.writeHead(200,{"Content-Type":"text/html"});
// 			fs.createReadStream("./index.html","UTF-8").pipe(res);
			// if(req.method === "POST")
			// {
				// var data="";
				// req.on("data", function(chunk)
				// {
				// 	data += chunk;
				// });
				// req.on("end", function(chunk)
				// {
				// 	var r = querystring.parse(data);
				// 	uemail=r["id"];
    // 				upassword=r["u_password"];
				// });
				MongoClient.connect(url, function (err, db) 
				{
			        if (err) {
			            console.log('Unable to connect to the mongoDB server. Error:', err);
			        }
			        else {
			           var cursor = db.collection("user").aggregate([{
			           	$match:{
			           		id: uemail,
			           		pass: upassword
			           	}
			           },{
			           	$project:{
			           		u_type:1
			           	}
			           },{
			           	$sort:{
			           		_id:-1
			           	}
			           },{
			           	$limit:100
			           }]); 
			           cursor.toArray(function(err,docs){
			           	if(err)throw err;
			           	console.log(docs.map(function(it){
			           		if(it.u_type === "M")
			           			{
			           				console.log("manufacturer");
									
			           			}
			           		else if(it.u_type === "D")
			           			console.log("Distributor");
			           		else if(it.u_type === "C")
			           			console.log("constomer");
			           		else if(it.u_type === "T")	
			           			console.log("transporter");
			           		return it.u_type;
			           	}));
			           	db.close();
			           });
			        }
			    });
			//}
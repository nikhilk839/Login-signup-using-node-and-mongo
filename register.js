var http = require('http');
var fs= require('fs');
var querystring= require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url ="mongodb://localhost:27017/ethereumpharma";

http.createServer(function (req,res){
		if(req.url === "/register")
		{
			res.writeHead(200,{"Content-Type":"text/html"});
			fs.createReadStream("./register.html","UTF-8").pipe(res);
			if(req.method === "POST")
			{
			var data="";
				req.on("data", function(chunk)
				{
					data += chunk;
				});
				req.on("end", function(chunk)
				{
					var r = querystring.parse(data);
					console.log(r);
					MongoClient.connect(url, { useNewUrlParser: true },function(err,db)
					{
						if(err) throw err;
						var q = querystring.parse(data);
						db.collection('user').insertOne(q, function(err,res)
						{
							if(err) throw err;
							console.log("Data inserted Successfully");
							db.close();
						});
					})
				});
			}
		}
	if(req.url === "/")
	{
		res.writeHead(200,{"Content-Type":"text/html"});
		fs.createReadStream("./index.html","UTF-8").pipe(res);
		var tools = require("./new.js");
		// var value = tools.check('nikhilk839','sss');
		var data="";
				req.on("data", function(chunk)
				{
					data += chunk;
				});
				req.on("end", function(chunk)
				{
					var r = querystring.parse(data);
					uemail=r["id"];
    				upassword=r["u_password"];
				});
	}
	
}).listen(3000);
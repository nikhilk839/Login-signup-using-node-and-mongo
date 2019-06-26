var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
 
var app = express();
 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/ethereumpharma');
app.set('view engine', 'jade');
 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.connect('mongodb://localhost/ethereumpharma');
 
var Schema = new mongoose.Schema({
	u_name : String,
	id : String,
	pass : String,
	address : String,
	u_tel: String,
	u_type : String
});
 
var user = mongoose.model('emp', Schema);
 
app.post('/registration', function(req, res){
	new user({
		u_name : req.body.u_name,
		id    : req.body.id,
		pass : req.body.pass,
		address : req.body.address,
		u_tel : req.body.u_tel,
		u_type : req.body.u_type			
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
	});
});
 
 app.get('/',function(req , res)
{
	res.sendfile('index.html');
})
app.get('/register',function(req ,res)
{
	res.sendfile('register.html');
}) 
 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
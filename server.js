var express = require('express')
  , app = express()
  , http = require('http');
var server = http.createServer(app)
var jade = require('jade');
var io = require('socket.io').listen(server);


app.set('views',__dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.configure(function() {
   app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('home.jade');
});

server.listen(3000);

io.sockets.on('connection', function (socket) {
  	socket.on('setName', function (data) {
   		socket.set('name', data);
	});
	socket.on('message', function (message) {
   		socket.get('name', function (error, name) {
      		var data = { 'message' : message, name : name };
      		socket.broadcast.emit('message', data);
      	console.log("user " + name + " send this : " + message);
   		})
	});
});
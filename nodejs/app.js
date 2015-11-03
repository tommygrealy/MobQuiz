var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});


io.on('connection', function(socket){
  io.emit('welcome')
  console.log('Client connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('NewTeam', function(data){
	console.log("Team: " + JSON.stringify(data.teamname) + " joined - (id="+socket.id+")")
	io.emit('NewTeam', data);
  })
  socket.on('disconnect', function(data){
	console.log ("ID: " + socket.id + " disconnected");
  })
  
  socket.on('AnswerChecked', function(data){
	console.log ("AnswerChecked: " +JSON.stringify(data));
	io.emit("AnswerChecked", data);
  })
  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
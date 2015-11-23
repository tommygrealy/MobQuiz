var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.get('/recoverScoreboard', function(req, res){
	fs.readFile('latest_scoreboard.json', 'utf8', function (err, data) {
		if (err) {
			res.send("fail");
		}
		else{
			var recoveredScoreboard=JSON.parse(data);
			io.emit("ScoreboardRecover",recoveredScoreboard)
			console.log("Recovered: " + JSON.stringify(recoveredScoreboard));
			res.send("ok");
		}
	});
}) 

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
  
  socket.on('NextQuestion', function(data){
	console.log("QM Moved to next question");
	io.emit("NextQuestion", data);
  })
  
  socket.on('SaveScoreboard', function(data){
	 fs.writeFile("latest_scoreboard.json", JSON.stringify(data), 'utf8');
  })
  
  socket.on('NextPicture', function(data){
	console.log("QM Moved to next picture");
	io.emit("NextPicture", data);
  })
  
  
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});
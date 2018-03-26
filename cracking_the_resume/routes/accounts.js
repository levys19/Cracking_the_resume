var express = require('express');
var app = require('express')();
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


router.get('/', function(req, res, next) {
    res.render('account.ejs', { title: 'accounts page' });
});



// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/account.html');
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// http.listen(port, function(){
//   console.log('listening on *:' + port);
// });

module.exports = router;

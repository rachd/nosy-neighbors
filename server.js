// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
    
'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const admin = require("firebase-admin");
const serviceAccount = require("firebase-key.json");
const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'frontend/public/index.html');
const server = express();
const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nosy-neighbors-game.firebaseio.com"
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

server.use('/api', router);
  
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
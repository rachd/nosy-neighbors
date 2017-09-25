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
const serviceAccount = require("./firebase-key.json");
const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'frontend/public/index.html');
const server = express();
const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nosy-neighbors-game.firebaseio.com"
});

router.get('/deck', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ draw: [
    {suit: 'hearts', value: 13, display: 'king', faceUp: false, id:'hearts13'},
    {suit: 'hearts', value: 12, display: 'queen', faceUp: false, id:'hearts12'},
    {suit: 'hearts', value: 11, display: 'jack', faceUp: false, id:'hearts11'},
    {suit: 'hearts', value: 10, display: 'ten', faceUp: false, id:'hearts10'},
    {suit: 'hearts', value: 9, display: 'nine', faceUp: false, id:'hearts9'},
    {suit: 'hearts', value: 8, display: 'eight', faceUp: false, id:'hearts8'},
    {suit: 'hearts', value: 7, display: 'seven', faceUp: false, id:'hearts7'},
    {suit: 'hearts', value: 6, display: 'six', faceUp: false, id:'hearts6'},
    {suit: 'hearts', value: 5, display: 'five', faceUp: false, id:'hearts5'},
    {suit: 'hearts', value: 4, display: 'four', faceUp: false, id:'hearts4'},
    {suit: 'hearts', value: 3, display: 'three', faceUp: false, id:'hearts3'},
    {suit: 'hearts', value: 2, display: 'two', faceUp: false, id:'hearts2'},
    {suit: 'hearts', value: 1, display: 'ace', faceUp: false, id:'hearts1'},
    {suit: 'diamonds', value: 13, display: 'king', faceUp: false, id:'diamonds13'},
    {suit: 'diamonds', value: 12, display: 'queen', faceUp: false, id:'diamonds12'},
    {suit: 'diamonds', value: 11, display: 'jack', faceUp: false, id:'diamonds11'},
    {suit: 'diamonds', value: 10, display: 'ten', faceUp: false, id:'diamonds10'},
    {suit: 'diamonds', value: 9, display: 'nine', faceUp: false, id:'diamonds9'},
    {suit: 'diamonds', value: 8, display: 'eight', faceUp: false, id:'diamonds8'},
    {suit: 'diamonds', value: 7, display: 'seven', faceUp: false, id:'diamonds7'},
    {suit: 'diamonds', value: 6, display: 'six', faceUp: false, id:'diamonds6'},
    {suit: 'diamonds', value: 5, display: 'five', faceUp: false, id:'diamonds5'},
    {suit: 'diamonds', value: 4, display: 'four', faceUp: false, id:'diamonds4'},
    {suit: 'diamonds', value: 3, display: 'three', faceUp: false, id:'diamonds3'},
    {suit: 'diamonds', value: 2, display: 'two', faceUp: false, id:'diamonds2'},
    {suit: 'diamonds', value: 1, display: 'ace', faceUp: false, id:'diamonds1'},
    {suit: 'clubs', value: 13, display: 'king', faceUp: false, id:'clubs13'},
    {suit: 'clubs', value: 12, display: 'queen', faceUp: false, id:'clubs12'},
    {suit: 'clubs', value: 11, display: 'jack', faceUp: false, id:'clubs11'},
    {suit: 'clubs', value: 10, display: 'ten', faceUp: false, id:'clubs10'},
    {suit: 'clubs', value: 9, display: 'nine', faceUp: false, id:'clubs9'},
    {suit: 'clubs', value: 8, display: 'eight', faceUp: false, id:'clubs8'},
    {suit: 'clubs', value: 7, display: 'seven', faceUp: false, id:'clubs7'},
    {suit: 'clubs', value: 6, display: 'six', faceUp: false, id:'clubs6'},
    {suit: 'clubs', value: 5, display: 'five', faceUp: false, id:'clubs5'},
    {suit: 'clubs', value: 4, display: 'four', faceUp: false, id:'clubs4'},
    {suit: 'clubs', value: 3, display: 'three', faceUp: false, id:'clubs3'},
    {suit: 'clubs', value: 2, display: 'two', faceUp: false, id:'clubs2'},
    {suit: 'clubs', value: 1, display: 'ace', faceUp: false, id:'clubs1'},
    {suit: 'spades', value: 13, display: 'king', faceUp: false, id:'spades13'},
    {suit: 'spades', value: 12, display: 'queen', faceUp: false, id:'spades12'},
    {suit: 'spades', value: 11, display: 'jack', faceUp: false, id:'spades11'},
    {suit: 'spades', value: 10, display: 'ten', faceUp: false, id:'spades10'},
    {suit: 'spades', value: 9, display: 'nine', faceUp: false, id:'spades9'},
    {suit: 'spades', value: 8, display: 'eight', faceUp: false, id:'spades8'},
    {suit: 'spades', value: 7, display: 'seven', faceUp: false, id:'spades7'},
    {suit: 'spades', value: 6, display: 'six', faceUp: false, id:'spades6'},
    {suit: 'spades', value: 5, display: 'five', faceUp: false, id:'spades5'},
    {suit: 'spades', value: 4, display: 'four', faceUp: false, id:'spades4'},
    {suit: 'spades', value: 3, display: 'three', faceUp: false, id:'spades3'},
    {suit: 'spades', value: 2, display: 'two', faceUp: false, id:'spades2'},
    {suit: 'spades', value: 1, display: 'ace', faceUp: false, id:'spades1'}
  ]});
});

router.put('/deck', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  res.json({
    draw: req.body
  })
});

router.get('/aces', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ 
    aceStacks: [
      {suit: '', value: 0, display: '', faceUp: true}, 
      {suit: '', value: 0, display: '', faceUp: true},
      {suit: '', value: 0, display: '', faceUp: true},
      {suit: '', value: 0, display: '', faceUp: true}
    ]
  });
});

router.get('/discard', function(req,res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ 
    discard: []
  });
});

router.get('/player-stacks', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    playerStacks: [
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}]
    ]
  });
});

router.get('/', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ 
    aceStacks: [
      {suit: '', value: 0, display: '', faceUp: true}, 
      {suit: '', value: 0, display: '', faceUp: true},
      {suit: '', value: 0, display: '', faceUp: true},
      {suit: '', value: 0, display: '', faceUp: true}
    ],
    playerStacks: [
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}], 
      [{suit: '', value: 14, display: '', faceUp: true}]
    ],
    discard: [],
    draw: [
      {suit: 'hearts', value: 13, display: 'king', faceUp: false, id:'hearts13'},
      {suit: 'hearts', value: 12, display: 'queen', faceUp: false, id:'hearts12'},
      {suit: 'hearts', value: 11, display: 'jack', faceUp: false, id:'hearts11'},
      {suit: 'hearts', value: 10, display: 'ten', faceUp: false, id:'hearts10'},
      {suit: 'hearts', value: 9, display: 'nine', faceUp: false, id:'hearts9'},
      {suit: 'hearts', value: 8, display: 'eight', faceUp: false, id:'hearts8'},
      {suit: 'hearts', value: 7, display: 'seven', faceUp: false, id:'hearts7'},
      {suit: 'hearts', value: 6, display: 'six', faceUp: false, id:'hearts6'},
      {suit: 'hearts', value: 5, display: 'five', faceUp: false, id:'hearts5'},
      {suit: 'hearts', value: 4, display: 'four', faceUp: false, id:'hearts4'},
      {suit: 'hearts', value: 3, display: 'three', faceUp: false, id:'hearts3'},
      {suit: 'hearts', value: 2, display: 'two', faceUp: false, id:'hearts2'},
      {suit: 'hearts', value: 1, display: 'ace', faceUp: false, id:'hearts1'},
      {suit: 'diamonds', value: 13, display: 'king', faceUp: false, id:'diamonds13'},
      {suit: 'diamonds', value: 12, display: 'queen', faceUp: false, id:'diamonds12'},
      {suit: 'diamonds', value: 11, display: 'jack', faceUp: false, id:'diamonds11'},
      {suit: 'diamonds', value: 10, display: 'ten', faceUp: false, id:'diamonds10'},
      {suit: 'diamonds', value: 9, display: 'nine', faceUp: false, id:'diamonds9'},
      {suit: 'diamonds', value: 8, display: 'eight', faceUp: false, id:'diamonds8'},
      {suit: 'diamonds', value: 7, display: 'seven', faceUp: false, id:'diamonds7'},
      {suit: 'diamonds', value: 6, display: 'six', faceUp: false, id:'diamonds6'},
      {suit: 'diamonds', value: 5, display: 'five', faceUp: false, id:'diamonds5'},
      {suit: 'diamonds', value: 4, display: 'four', faceUp: false, id:'diamonds4'},
      {suit: 'diamonds', value: 3, display: 'three', faceUp: false, id:'diamonds3'},
      {suit: 'diamonds', value: 2, display: 'two', faceUp: false, id:'diamonds2'},
      {suit: 'diamonds', value: 1, display: 'ace', faceUp: false, id:'diamonds1'},
      {suit: 'clubs', value: 13, display: 'king', faceUp: false, id:'clubs13'},
      {suit: 'clubs', value: 12, display: 'queen', faceUp: false, id:'clubs12'},
      {suit: 'clubs', value: 11, display: 'jack', faceUp: false, id:'clubs11'},
      {suit: 'clubs', value: 10, display: 'ten', faceUp: false, id:'clubs10'},
      {suit: 'clubs', value: 9, display: 'nine', faceUp: false, id:'clubs9'},
      {suit: 'clubs', value: 8, display: 'eight', faceUp: false, id:'clubs8'},
      {suit: 'clubs', value: 7, display: 'seven', faceUp: false, id:'clubs7'},
      {suit: 'clubs', value: 6, display: 'six', faceUp: false, id:'clubs6'},
      {suit: 'clubs', value: 5, display: 'five', faceUp: false, id:'clubs5'},
      {suit: 'clubs', value: 4, display: 'four', faceUp: false, id:'clubs4'},
      {suit: 'clubs', value: 3, display: 'three', faceUp: false, id:'clubs3'},
      {suit: 'clubs', value: 2, display: 'two', faceUp: false, id:'clubs2'},
      {suit: 'clubs', value: 1, display: 'ace', faceUp: false, id:'clubs1'},
      {suit: 'spades', value: 13, display: 'king', faceUp: false, id:'spades13'},
      {suit: 'spades', value: 12, display: 'queen', faceUp: false, id:'spades12'},
      {suit: 'spades', value: 11, display: 'jack', faceUp: false, id:'spades11'},
      {suit: 'spades', value: 10, display: 'ten', faceUp: false, id:'spades10'},
      {suit: 'spades', value: 9, display: 'nine', faceUp: false, id:'spades9'},
      {suit: 'spades', value: 8, display: 'eight', faceUp: false, id:'spades8'},
      {suit: 'spades', value: 7, display: 'seven', faceUp: false, id:'spades7'},
      {suit: 'spades', value: 6, display: 'six', faceUp: false, id:'spades6'},
      {suit: 'spades', value: 5, display: 'five', faceUp: false, id:'spades5'},
      {suit: 'spades', value: 4, display: 'four', faceUp: false, id:'spades4'},
      {suit: 'spades', value: 3, display: 'three', faceUp: false, id:'spades3'},
      {suit: 'spades', value: 2, display: 'two', faceUp: false, id:'spades2'},
      {suit: 'spades', value: 1, display: 'ace', faceUp: false, id:'spades1'}
    ]
  });   
});

server.use('/api', router);
  
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
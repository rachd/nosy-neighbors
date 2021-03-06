import axios from 'axios';
import {DECK} from "../constants/Deck";
import fire from '../fire';

let aceStacks = [
  {suit: '', value: 0, display: '', faceUp: true}, 
  {suit: '', value: 0, display: '', faceUp: true},
  {suit: '', value: 0, display: '', faceUp: true},
  {suit: '', value: 0, display: '', faceUp: true}];
let drawStack = DECK;
let discardStack = [];
let playerStacks = [
  [{suit: '', value: 14, display: '', faceUp: true}], 
  [{suit: '', value: 14, display: '', faceUp: true}], 
  [{suit: '', value: 14, display: '', faceUp: true}], 
  [{suit: '', value: 14, display: '', faceUp: true}]
];
let observer = null;

const gameRef = fire.database().ref('game');
gameRef.on('value', function(snapshot) {
  const val = snapshot.val();
  if(val.players) {
    playerStacks = val.players;
  }
  if(val.draw) {
    drawStack = val.draw;
  }
  if(val.discard) {
    discardStack = val.discard;
  }
  if(val.aces) {
    aceStacks = val.aces;
  }
  observer(aceStacks, drawStack, discardStack, playerStacks);
});

function emitChange() {
  fire.database().ref('game').set({
    aces: aceStacks,
    discard: discardStack,
    draw: drawStack,
    players: playerStacks
  });
}

export function setUpGame() {
  drawStack = shuffle(DECK);
  for (let i = 0; i < 4; i++) {
    playerStacks[i] = [];
    for (let j = 0; j < i+1; j++) {
      playerStacks[i].push(drawStack[0]);
      drawStack = drawStack.slice(1);
    }
    playerStacks[i][playerStacks[i].length-1].faceUp = true;
  }
  emitChange();
};

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeAce(id) {
  if(aceStacks[id].value == 1) {
    aceStacks[id].suit = '';
    aceStacks[id].value = 0;
    aceStacks[id].display = '';
  } else {
    aceStacks[id].value = aceStacks[id].value - 1;
    aceStacks[id].display = aceStacks[id].value;
  }
}

function removePlayerCard(id, card) {
  if(playerStacks[id].length == 1) {
    playerStacks[id] = [{suit: '', value: 14, display: '', faceUp: true}];
  } else {
    for (let [index, pCard] of playerStacks[id].entries()) {
      if (pCard.id === card.id) {
        playerStacks[id] = playerStacks[id].slice(0, index);
        return;
      }
    }
  }
}

function removeCard(card) {
  let id = card.parent;
  if (id.includes('player')) {
    id = id.slice(6);
    removePlayerCard(id, card);
  } else if (id.includes('ace')) {
    id = parseInt(id.slice(3));
    removeAce(id);
  } else if (id.includes('discard')) {
    discardStack = discardStack.slice(0, discardStack.length - 1);
  } else {
    drawStack = drawStack.slice(1);
  }
}

function checkForFlipDraw() {
  if (drawStack.length == 0 && discardStack.length > 0) {
    for (let dcard of discardStack) {
      dcard.faceUp = false;
    }
    drawStack = discardStack;
    discardStack = [];
    emitChange();
  }
}

function checkForWin() {
  let win = true;
  for (let astack of aceStacks) {
    if (astack.value != 1) {
      return false;
    }
  }
  alert('You win!');
  return true;
}

export function flipCard(stack) {
  if (stack === 'draw') {
    if (drawStack.length > 0) {
      drawStack[0].faceUp = true;
      emitChange();
    }
  }
  if (stack.includes('player')) {
    const id = stack.slice(6);
    if(!playerStacks[id][playerStacks[id].length - 1].faceUp){
      playerStacks[id][playerStacks[id].length - 1].faceUp = true;
      emitChange();
    }
  }
}

export function canMoveCardToDiscard(card) {
  return card.parent === 'draw';
}

export function moveCardToDiscard(card) {
  discardStack.push(card);
  removeCard(card);
  checkForFlipDraw();
  emitChange();
}

export function canMoveCardToAce(card, suit, value) {
  const stackSuit = suit ? suit : card.suit;
  return (card.suit === stackSuit && card.value == value + 1);
}

export function moveCardToAce(card, id) {
  aceStacks[id].suit = card.suit;
  aceStacks[id].value = card.value;
  aceStacks[id].display = card.display;
  aceStacks[id].faceUp = true;
  removeCard(card);
  checkForWin();
  checkForFlipDraw();
  emitChange();
}

export function canMoveCardToPlayer(card, suit, value) {
  let cardColor = '';
  let stackColor = '';
  if (card.suit == 'hearts' || card.suit == 'diamonds') {
    cardColor = 'red';
  } else {
    cardColor = 'black';
  }
  if (suit == '') {
    stackColor = '';
  } else if (suit == 'hearts' || suit == 'diamonds') {
    stackColor = 'red';
  } else {
    stackColor = 'black';
  }
  return (cardColor != stackColor && card.value === value - 1);
}

export function moveCardToPlayer(card, id) {
  if (card.parent.includes("player")) {
      const parentStack = playerStacks[card.parent.slice(-1)];
      let cardIndex = 0;
      for (let pcard of parentStack) {
        if (pcard.id === card.id) {
          cardIndex = parentStack.indexOf(pcard);
        }
      }
      for (let i = cardIndex; i < parentStack.length; i++) {
        playerStacks[id].push(parentStack[i]);
      }
      playerStacks[card.parent.slice(-1)] = parentStack.slice(0, cardIndex);
      if(!playerStacks[card.parent.slice(-1)][0]) {
        playerStacks[card.parent.slice(-1)] = [{suit: '', value: 14, display: '', faceUp: true}];
      }
  } else {
    playerStacks[id].push(card);
    removeCard(card);
  }
  if (playerStacks[id][0].value == 14) {
    playerStacks[id] = playerStacks[id].slice(1);
  }
  checkForFlipDraw();
  emitChange();
}
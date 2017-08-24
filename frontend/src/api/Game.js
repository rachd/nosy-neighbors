let aceStacks = [
  {suit: '', value: 0, display: ''}, 
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''}];
let drawStack = [
  // {suit: 'spades', value: 1, display: 'ace'},
  // {suit: 'clubs', value: 1, display: 'ace'},
  // {suit: 'spades', value: 2, display: 'two'},
  {suit: 'hearts', value: 13, display: 'king'},
  {suit: 'spades', value: 12, display: 'queen'},
  {suit: 'diamonds', value: 13, display: 'king'},
  {suit: 'hearts', value: 11, display: 'jack'},
  {suit: 'clubs', value: 12, display: 'queen'}
];
let playerStacks = [
  [{suit: '', value: 14, display: ''}], 
  [{suit: '', value: 14, display: ''}], 
  [{suit: '', value: 14, display: ''}], 
  [{suit: '', value: 14, display: ''}]
];
let observer = null;

function emitChange() {
  observer(aceStacks, drawStack, playerStacks);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
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
  if(card.value == 13) {
    playerStacks[id] = [{suit: '', value: 14, display: ''}];
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
  } else {
    drawStack = drawStack.slice(1);
  }
}

export function canMoveCardToAce(card, suit, value) {
  const stackSuit = suit ? suit : card.suit;
  return (card.suit === stackSuit && card.value == value + 1);
}

export function moveCardToAce(card, suit, value, id) {
  aceStacks[id].suit = card.suit;
  aceStacks[id].value = card.value;
  aceStacks[id].display = card.display;
  removeCard(card);
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
        playerStacks[card.parent.slice(-1)] = [{suit: '', value: 14, display: ''}];
      }
  } else {
    playerStacks[id].push(card);
    removeCard(card);
  }
  if (playerStacks[id][0].value == 14) {
    playerStacks[id] = playerStacks[id].slice(1);
  }
  emitChange();
}
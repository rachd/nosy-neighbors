let aceStacks = [
  {suit: '', value: 0, display: ''}, 
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''}];
let drawStack = [
  {suit: 'spades', value: 1, display: 'ace'},
  {suit: 'clubs', value: 1, display: 'ace'},
  {suit: 'spades', value: 2, display: 'two'},
  {suit: 'hearts', value: 13, display: 'king'}
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

export function canMoveCardToAce(card, suit, value) {
  const stackSuit = suit ? suit : card.suit;
  return (card.suit === stackSuit && card.value == value + 1);
}

export function moveCardToAce(card, suit, value, id) {
  aceStacks[id].suit = card.suit;
  aceStacks[id].value = card.value;
  aceStacks[id].display = card.display;
  drawStack = drawStack.slice(1);
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
    stackColor = cardColor;
  } else if (suit == 'hearts' || suit == 'diamonds') {
    stackColor = 'red';
  } else {
    stackColor = 'black';
  }
  return (cardColor === stackColor && card.value === value - 1);
}

export function moveCardToPlayer(card, id) {
  playerStacks[id].push(card);
  drawStack = drawStack.slice(1);
  emitChange();
}
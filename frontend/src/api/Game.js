let aceStacks = [
  {suit: '', value: 0, display: ''}, 
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''},
  {suit: '', value: 0, display: ''}];
let drawStack = [
  {suit: 'spades', value: 1, display: 'ace'},
  {suit: 'clubs', value: 1, display: 'ace'},
  {suit: 'spades', value: 2, display: 'two'},
  {suit: 'hearts', value: 3, display: 'three'}
];
let observer = null;

function emitChange() {
  observer(aceStacks, drawStack);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function canMoveCard(card, suit, value) {
  const stackSuit = suit ? suit : card.suit;
  return (card.suit === stackSuit && card.value == value + 1);
}

export function moveCard(card, suit, value, id) {
  aceStacks[id].suit = card.suit;
  aceStacks[id].value = card.value;
  aceStacks[id].display = card.display;
  drawStack = drawStack.slice(1);
  emitChange();
}
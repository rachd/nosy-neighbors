let aceStacks = [
  {suit: 'spade', value: 1}, 
  {suit: '', value: 0},
  {suit: '', value: 0},
  {suit: '', value: 0}];
let observer = null;

function emitChange() {
  observer(aceStacks);
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

  return (card.suit === stackSuit && card.value === value + 1);
}

export function moveCard(card, prevStack, newStack) {
  // console.log("id" + id);
  // console.log("suit" + suit);
  // console.log(aceStacks);
  // aceStacks[id] = {suit: suit, value: value};
  // console.log(aceStacks);
  emitChange();
}
import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    constructor(props) {
        super(props);
        this.deck = [
            { value: 1, suit: 'hearts', display: 'A' },
            { value: 2, suit: 'hearts', display: '2' },
            { value: 3, suit: 'hearts', display: '3' },
            { value: 4, suit: 'hearts', display: '4' },
            { value: 5, suit: 'hearts', display: '5' },
            { value: 6, suit: 'hearts', display: '6' },
            { value: 7, suit: 'hearts', display: '7' },
            { value: 8, suit: 'hearts', display: '8' },
            { value: 9, suit: 'hearts', display: '9' },
            { value: 10, suit: 'hearts', display: '10' },
            { value: 11, suit: 'hearts', display: 'J' },
            { value: 12, suit: 'hearts', display: 'Q' },
            { value: 13, suit: 'hearts', display: 'K' },
            { value: 1, suit: 'diamonds', display: 'A' },
            { value: 2, suit: 'diamonds', display: '2' },
            { value: 3, suit: 'diamonds', display: '3' },
            { value: 4, suit: 'diamonds', display: '4' },
            { value: 5, suit: 'diamonds', display: '5' },
            { value: 6, suit: 'diamonds', display: '6' },
            { value: 7, suit: 'diamonds', display: '7' },
            { value: 8, suit: 'diamonds', display: '8' },
            { value: 9, suit: 'diamonds', display: '9' },
            { value: 10, suit: 'diamonds', display: '10' },
            { value: 11, suit: 'diamonds', display: 'J' },
            { value: 12, suit: 'diamonds', display: 'Q' },
            { value: 13, suit: 'diamonds', display: 'K' },
            { value: 1, suit: 'clubs', display: 'A' },
            { value: 2, suit: 'clubs', display: '2' },
            { value: 3, suit: 'clubs', display: '3' },
            { value: 4, suit: 'clubs', display: '4' },
            { value: 5, suit: 'clubs', display: '5' },
            { value: 6, suit: 'clubs', display: '6' },
            { value: 7, suit: 'clubs', display: '7' },
            { value: 8, suit: 'clubs', display: '8' },
            { value: 9, suit: 'clubs', display: '9' },
            { value: 10, suit: 'clubs', display: '10' },
            { value: 11, suit: 'clubs', display: 'J' },
            { value: 12, suit: 'clubs', display: 'Q' },
            { value: 13, suit: 'clubs', display: 'K' },
            { value: 1, suit: 'spades', display: 'A' },
            { value: 2, suit: 'spades', display: '2' },
            { value: 3, suit: 'spades', display: '3' },
            { value: 4, suit: 'spades', display: '4' },
            { value: 5, suit: 'hearts', display: '5' },
            { value: 6, suit: 'spades', display: '6' },
            { value: 7, suit: 'spades', display: '7' },
            { value: 8, suit: 'spades', display: '8' },
            { value: 9, suit: 'spades', display: '9' },
            { value: 10, suit: 'spades', display: '10' },
            { value: 11, suit: 'spades', display: 'J' },
            { value: 12, suit: 'spades', display: 'Q' },
            { value: 13, suit: 'spades', display: 'K' }
        ];
    }

    componentDidMount() {
        console.log(this.deck);
    }
    render() {
        return (
            <Board id="p1"></Board>
        );
    }
}

export default Game;
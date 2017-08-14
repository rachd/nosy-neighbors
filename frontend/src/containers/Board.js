import React, { Component } from 'react';
import Card from '../components/Card';

class Board extends Component {
    render() {
        return (
            <div className="board">
                <Card value="A" suit="hearts"></Card>
                <Card value="3" suit="clubs"></Card>
                <Card value="10" suit="diamonds"></Card>
                <Card value="Q" suit="spades"></Card>
            </div>
        );
    }
}

export default Board;
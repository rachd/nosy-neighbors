import React, { Component } from 'react';
import Card from '../components/Card';
import './Stack.css';

class Stack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards
        }
    }
    componentDidMount() {
        // console.log(this.state.cards);
    }
    drop(e) {
        e.preventDefault();
        const card = e.dataTransfer.getData("text");
        console.log(e.dataTransfer.getData("text"));
        // this.setState({cards: })
    }
    dragover(e) {
        e.preventDefault();

    }
    render() {
        let cards = [];
        for (let card of this.state.cards){
            cards.push(<Card id={card.value + card.suit} key={card.value + card.suit} value={card.value} suit={card.suit} display={card.display} faceUp={false}></Card>)
        }
        if (this.state.cards.length > 0) {
            return (
                <div className="stack" onDragEnd={this.drop}>{cards}</div>
            )
        } else {
            return (
                <div className="stack empty" onDrop={this.drop}></div>
            );
        }
    }
}

export default Stack;
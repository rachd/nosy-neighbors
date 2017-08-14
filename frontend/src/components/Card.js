import React from 'react';
import cardback from '../images/cardback.jpg';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            suit: this.props.suit,
            faceUp: false
        }
        this.show = this.show.bind(this);
    }
    show() {
        this.setState({faceUp: true});
    }
    render() {
        let contents = null;
        if (this.state.faceUp) {
            contents = <h1 className={this.state.suit}>{this.state.value}</h1>
        } else {
            contents = <img src={cardback} alt="face down"/>
        }
        return (
            <div className="card" draggable="true" onClick={this.show}>
              {contents}
            </div>
        );
    }
}

export default Card;
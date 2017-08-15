import React from 'react';
import cardback from '../images/cardback.jpg';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            suit: this.props.suit,
            display: this.props.display,
            faceUp: this.props.faceUp
        }
        this.show = this.show.bind(this);
    }
    show() {
        this.setState({faceUp: true});
    }
    drag(e) {
        console.log(e.target);
        e.dataTransfer.setData("text", e.target.id);
    }
    render() {
        let contents = null;
        if (this.state.faceUp) {
            contents = <h1 className={this.state.suit} data-value={this.state.value}>{this.state.display}</h1>
        } else {
            contents = <img src={cardback} alt="face down"/>
        }
        return (
            <div className="card" draggable="true" onDragStart={this.drag} onClick={this.show}>
              {contents}
            </div>
        );
    }
}

export default Card;
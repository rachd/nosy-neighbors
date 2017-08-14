import React, { Component } from 'react';
import Card from '../components/Card';

class AceStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            suit: null
        }
        this.show = this.show.bind(this);
    }
    render() {
        return (
            <div className="acestack">
            </div>
        );
    }
}

export default Board;
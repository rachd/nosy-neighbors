import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceStack from '../containers/AceStack';
import Card from './Card';
import { canMoveCard, moveCard } from '../api/Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    static propTypes = {
        aceStacks: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired
    };

    renderAceStack(i, stack) {
        return (
            <div key={i}>
            <AceStack id={i} suit={stack.suit} value={stack.value}>
                {this.renderCard(stack.suit, stack.value)}
            </AceStack>
            </div>
        );
    }

    renderCard(suit, value) {
        if (suit != '') {
            return <Card id={1} value={value} suit={suit} display='Ace'/>;
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 4; i++) {
        squares.push(this.renderAceStack(i, this.props.aceStacks[i]));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
            {squares}
        </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);
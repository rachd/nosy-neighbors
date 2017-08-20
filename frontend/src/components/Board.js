import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceStack from '../containers/AceStack';
import DrawStack from '../containers/DrawStack';
import Card from './Card';
import { canMoveCard, moveCard } from '../api/Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    static propTypes = {
        aceStacks: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
        drawStack: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired
    };

    renderAceStack(i, stack) {
        return (
            <div key={i}>
            <AceStack id={i} suit={stack.suit} value={stack.value}>
                {this.renderCard(stack.suit, stack.value, stack.display)}
            </AceStack>
            </div>
        );
    }

    renderDrawStack(stack) {
        if (stack.length > 0) {
            return (
                <DrawStack>
                    {this.renderCard(stack[0].suit, stack[0].value, stack[0].display)}
                </DrawStack>
            );
        } else {
            return (
                <DrawStack></DrawStack>
            )
        }
    }

    renderCard(suit, value, display) {
        if (suit != '') {
            return <Card id={1} value={value} suit={suit} display={display}/>;
        }
    }

    render() {
        const aceStacks = [];
        const drawPile = this.renderDrawStack(this.props.drawStack);
        for (let i = 0; i < 4; i++) {
        aceStacks.push(this.renderAceStack(i, this.props.aceStacks[i]));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
            {drawPile}
            {aceStacks}
        </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);
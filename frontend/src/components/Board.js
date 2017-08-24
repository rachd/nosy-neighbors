import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceStack from '../containers/AceStack';
import DrawStack from '../containers/DrawStack';
import PlayerStack from '../containers/PlayerStack';
import Card from './Card';
import { canMoveCardToPlayer, moveCardToPlayer, canMoveCardToAce, moveCardToAce } from '../api/Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    static propTypes = {
        aceStacks: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
        drawStack: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
        playerStacks: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.object.isRequired
            ).isRequired
        ).isRequired
    };

    renderAceStack(i, stack) {
        return (
            <AceStack key={i} id={i} suit={stack.suit} value={stack.value}>
                {this.renderCard(stack.suit, stack.value, stack.display)}
            </AceStack>
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

    renderPlayerStack(i, stack) {
        const lastCard = stack[stack.length - 1];
        let cards = stack.map((card, index) => this.renderCard(card.suit, card.value, card.display, index));
        return (
            <PlayerStack key={i} id={i} value={lastCard.value} suit={lastCard.suit}>
                {cards[0] ? cards : null}
            </PlayerStack>
        )
    }

    renderCard(suit, value, display, key=0) {
        if (suit != '') {
            return <Card key={key} id={suit+value} value={value} suit={suit} display={display}/>;
        }
    }

    render() {
        const aceStacks = [];
        const playerStacks = [];
        const drawPile = this.renderDrawStack(this.props.drawStack);
        for (let i = 0; i < 4; i++) {
            aceStacks.push(this.renderAceStack(i, this.props.aceStacks[i]));
        }
        for (let j = 0; j < 4; j++) {
            playerStacks.push(this.renderPlayerStack(j, this.props.playerStacks[j]));
        }

        return (
            <div>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                {drawPile}
                {aceStacks}
                </div>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                {playerStacks}
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);
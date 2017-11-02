import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceStack from '../containers/AceStack';
import DrawStack from '../containers/DrawStack';
import PlayerStack from '../containers/PlayerStack';
import DiscardStack from '../containers/DiscardStack';
import Card from './Card';
import { setUpGame, canMoveCardToPlayer, moveCardToPlayer, canMoveCardToAce, moveCardToAce } from '../api/Game';
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
        discardStack: PropTypes.arrayOf(
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
                {this.renderCard(stack.suit, stack.value, stack.display, true)}
            </AceStack>
        );
    }

    renderDrawStack(stack) {
        if (stack.length > 0) {
            return (
                <DrawStack>
                    {this.renderCard(stack[0].suit, stack[0].value, stack[0].display, stack[0].faceUp)}
                </DrawStack>
            );
        } else {
            return (
                <DrawStack></DrawStack>
            )
        }
    }

    renderDiscardStack(stack) {
        if (stack.length > 0) {
            const len = stack.length - 1;
            return (
                <DiscardStack>
                    {this.renderCard(stack[len].suit, stack[len].value, stack[len].display, stack[len].faceUp)}
                </DiscardStack>
            );
        } else {
            return (
                <DiscardStack></DiscardStack>
            )
        }
    }

    renderPlayerStack(i, stack) {
        const lastCard = stack[stack.length - 1];
        let cards = stack.map((card, index) => this.renderCard(card.suit, card.value, card.display, card.faceUp, index, (30 * index)));
        return (
            <PlayerStack key={i} id={i} value={lastCard.value} suit={lastCard.suit}>
                {cards[0] ? cards : null}
            </PlayerStack>
        )
    }

    renderCard(suit, value, display, faceUp, key=0, top=0) {
        if (suit != '') {
            return <Card key={key} id={suit+value} value={value} suit={suit} display={display} faceUp={faceUp} top={top}/>;
        }
    }

    componentDidMount() {
        setUpGame();
    }

    render() {
        const aceStacks = [];
        const playerStacks = [];
        const drawPile = this.renderDrawStack(this.props.drawStack);
        const discardPile = this.renderDiscardStack(this.props.discardStack);
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
                {discardPile}
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
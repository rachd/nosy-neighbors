import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from '../containers/BoardSquare';
import Card from './Card';
import { canMoveKnight, moveKnight } from '../api/Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    static propTypes = {
        knightPosition: PropTypes.arrayOf(
        PropTypes.number.isRequired
        ).isRequired
    };

    renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
        <div key={i}
            style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x}
                    y={y}>
            {this.renderCard(x, y)}
        </BoardSquare>
        </div>
    );
    }

    renderCard(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Card />;
        }
    }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
        squares.push(this.renderSquare(i));
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
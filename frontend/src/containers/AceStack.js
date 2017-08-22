import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stack from '../components/Stack';
import { canMoveCardToAce, moveCardToAce } from '../api/Game';
import { ItemTypes } from '../constants/Types';
import { DropTarget } from 'react-dnd';

const stackTarget = {
  drop(props, monitor) {
    let card = monitor.getItem();
    moveCardToAce(card, props.suit, props.value, props.id);
  },
  canDrop(props, monitor) {
    let card = monitor.getItem();
    return canMoveCardToAce(card, props.suit, props.value);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class AceStack extends Component {
    renderOverlay(color) {
        return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }} />
        );
    }
  
    render() {
        const { id, suit, value, connectDropTarget, isOver, canDrop } = this.props;

        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Stack id={'ace'+id}>
                {this.props.children}
                </Stack>
                {isOver && !canDrop && this.renderOverlay('red')}
                {isOver && canDrop && this.renderOverlay('green')}
            </div>
        );
    }
}

AceStack.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  suit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default DropTarget(ItemTypes.CARD, stackTarget, collect)(AceStack);

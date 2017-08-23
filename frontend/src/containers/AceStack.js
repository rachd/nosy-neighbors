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
    render() {
        const { id, suit, value, connectDropTarget, isOver, canDrop } = this.props;
        let backgroundColor = "transparent";
        if(this.props.isOver && !this.props.canDrop) {
            backgroundColor = "red";
        } else if (this.props.isOver && this.props.canDrop) {
            backgroundColor = "green";
        }
        return connectDropTarget(
            <div className="aceStack" style={{backgroundColor: backgroundColor}}>
                <Stack id={'ace'+id}>
                {this.props.children}
                </Stack>
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

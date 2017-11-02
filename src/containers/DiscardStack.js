import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stack from '../components/Stack';
import { canMoveCardToDiscard, moveCardToDiscard } from '../api/Game';
import { ItemTypes } from '../constants/Types';
import { DropTarget } from 'react-dnd';

const stackTarget = {
  drop(props, monitor) {
    let card = monitor.getItem();
    moveCardToDiscard(card);
  },
  canDrop(props, monitor) {
    let card = monitor.getItem();
    return canMoveCardToDiscard(card);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DiscardStack extends Component {
    render() {
        const { connectDropTarget, isOver, canDrop } = this.props;
        let backgroundColor = "transparent";
        if(this.props.isOver && !this.props.canDrop) {
            backgroundColor = "red";
        } else if (this.props.isOver && this.props.canDrop) {
            backgroundColor = "green";
        }
        return connectDropTarget(
            <div className="discardStack" style={{backgroundColor: backgroundColor}}>
                <Stack id="discard">
                {this.props.children}
                </Stack>
            </div>
        );
    }
}

DiscardStack.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.CARD, stackTarget, collect)(DiscardStack);

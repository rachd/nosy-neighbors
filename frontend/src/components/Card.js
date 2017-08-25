import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants/Types';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    const parentId = document.getElementById(props.id).parentElement.id;
    return {id: props.id, suit: props.suit, value: props.value, display: props.display, faceUp: true, parent: parentId};
  },
  canDrag(props) {
      if (props.faceUp) {
          return true;
      } else {
          return false;
      }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class Card extends Component {
  render() {
        const { connectDragSource, isDragging, id, suit, value, display, faceUp } = this.props;
        let content = this.props.faceUp ? this.props.display + ' of ' + this.props.suit : 'face down';
        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                width: '150px',
                height: '200px',
                cursor: faceUp ? 'move' : 'default',
                border: '1px solid black'
            }} id={id}>{content}</div>
        );
  }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    faceUp: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
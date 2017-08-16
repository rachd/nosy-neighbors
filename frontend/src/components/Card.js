import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants/Types';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {id: props.id};
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
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                width: '150px',
                height: '200px',
                cursor: 'move',
                border: '1px solid black'
            }}>Ace of Spades</div>
        );
  }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
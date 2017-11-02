import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants/Types';
import { DragSource } from 'react-dnd';
import cardback from '../images/cardback.jpg'
import clubs2 from '../images/2_of_clubs.png'
import clubs3 from '../images/3_of_clubs.png'
import clubs4 from '../images/4_of_clubs.png'
import clubs5 from '../images/5_of_clubs.png'
import clubs6 from '../images/6_of_clubs.png'
import clubs7 from '../images/7_of_clubs.png'
import clubs8 from '../images/8_of_clubs.png'
import clubs9 from '../images/9_of_clubs.png'
import clubs10 from '../images/10_of_clubs.png'
import clubs11 from '../images/jack_of_clubs.png'
import clubs12 from '../images/queen_of_clubs.png'
import clubs13 from '../images/king_of_clubs.png'
import clubs1 from '../images/ace_of_clubs.png'
import diamonds2 from '../images/2_of_diamonds.png'
import diamonds3 from '../images/3_of_diamonds.png'
import diamonds4 from '../images/4_of_diamonds.png'
import diamonds5 from '../images/5_of_diamonds.png'
import diamonds6 from '../images/6_of_diamonds.png'
import diamonds7 from '../images/7_of_diamonds.png'
import diamonds8 from '../images/8_of_diamonds.png'
import diamonds9 from '../images/9_of_diamonds.png'
import diamonds10 from '../images/10_of_diamonds.png'
import diamonds11 from '../images/jack_of_diamonds.png'
import diamonds12 from '../images/queen_of_diamonds.png'
import diamonds13 from '../images/king_of_diamonds.png'
import diamonds1 from '../images/ace_of_diamonds.png'
import hearts2 from '../images/2_of_hearts.png'
import hearts3 from '../images/3_of_hearts.png'
import hearts4 from '../images/4_of_hearts.png'
import hearts5 from '../images/5_of_hearts.png'
import hearts6 from '../images/6_of_hearts.png'
import hearts7 from '../images/7_of_hearts.png'
import hearts8 from '../images/8_of_hearts.png'
import hearts9 from '../images/9_of_hearts.png'
import hearts10 from '../images/10_of_hearts.png'
import hearts11 from '../images/jack_of_hearts.png'
import hearts12 from '../images/queen_of_hearts.png'
import hearts13 from '../images/king_of_hearts.png'
import hearts1 from '../images/ace_of_hearts.png'
import spades2 from '../images/2_of_spades.png'
import spades3 from '../images/3_of_spades.png'
import spades4 from '../images/4_of_spades.png'
import spades5 from '../images/5_of_spades.png'
import spades6 from '../images/6_of_spades.png'
import spades7 from '../images/7_of_spades.png'
import spades8 from '../images/8_of_spades.png'
import spades9 from '../images/9_of_spades.png'
import spades10 from '../images/10_of_spades.png'
import spades11 from '../images/jack_of_spades.png'
import spades12 from '../images/queen_of_spades.png'
import spades13 from '../images/king_of_spades.png'
import spades1 from '../images/ace_of_spades.png'

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
  chooseImage(id) {
    switch (id) {
        case "hearts1": return `url(${hearts1})`
        case "hearts2": return `url(${hearts2})`
        case "hearts3": return `url(${hearts3})`
        case "hearts4": return `url(${hearts4})`
        case "hearts5": return `url(${hearts5})`
        case "hearts6": return `url(${hearts6})`
        case "hearts7": return `url(${hearts7})`
        case "hearts8": return `url(${hearts8})`
        case "hearts9": return `url(${hearts9})`
        case "hearts10": return `url(${hearts10})`
        case "hearts11": return `url(${hearts11})`
        case "hearts12": return `url(${hearts12})`
        case "hearts13": return `url(${hearts13})`
        case "diamonds1": return `url(${diamonds1})`
        case "diamonds2": return `url(${diamonds2})`
        case "diamonds3": return `url(${diamonds3})`
        case "diamonds4": return `url(${diamonds4})`
        case "diamonds5": return `url(${diamonds5})`
        case "diamonds6": return `url(${diamonds6})`
        case "diamonds7": return `url(${diamonds7})`
        case "diamonds8": return `url(${diamonds8})`
        case "diamonds9": return `url(${diamonds9})`
        case "diamonds10": return `url(${diamonds10})`
        case "diamonds11": return `url(${diamonds11})`
        case "diamonds12": return `url(${diamonds12})`
        case "diamonds13": return `url(${diamonds13})`
        case "spades1": return `url(${spades1})`
        case "spades2": return `url(${spades2})`
        case "spades3": return `url(${spades3})`
        case "spades4": return `url(${spades4})`
        case "spades5": return `url(${spades5})`
        case "spades6": return `url(${spades6})`
        case "spades7": return `url(${spades7})`
        case "spades8": return `url(${spades8})`
        case "spades9": return `url(${spades9})`
        case "spades10": return `url(${spades10})`
        case "spades11": return `url(${spades11})`
        case "spades12": return `url(${spades12})`
        case "spades13": return `url(${spades13})`
        case "clubs1": return `url(${clubs1})`
        case "clubs2": return `url(${clubs2})`
        case "clubs3": return `url(${clubs3})`
        case "clubs4": return `url(${clubs4})`
        case "clubs5": return `url(${clubs5})`
        case "clubs6": return `url(${clubs6})`
        case "clubs7": return `url(${clubs7})`
        case "clubs8": return `url(${clubs8})`
        case "clubs9": return `url(${clubs9})`
        case "clubs10": return `url(${clubs10})`
        case "clubs11": return `url(${clubs11})`
        case "clubs12": return `url(${clubs12})`
        case "clubs13": return `url(${clubs13})`
        default: return `url(${cardback})`
    }
  }
  render() {
        const { connectDragSource, isDragging, id, suit, value, display, faceUp, top } = this.props;
        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.5 : 1,
                width: '143px',
                height: '200px',
                cursor: faceUp ? 'move' : 'default',
                border: '1px solid black',
                backgroundColor: "white",
                backgroundImage: faceUp ? this.chooseImage(id) : `url(${cardback})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                top: top
            }} id={id}></div>
        );
  }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    faceUp: PropTypes.bool.isRequired,
    top: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
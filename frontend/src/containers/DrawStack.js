import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stack from '../components/Stack';
import {flipCard} from '../api/Game';

class DrawStack extends Component {
    handleClick() {
        flipCard("draw");
    }
  
    render() {
        return (
            <div className="drawStack" onClick={this.handleClick}>
                <Stack id="draw">
                {this.props.children}
                </Stack>
            </div>
        );
    }
}

export default DrawStack;

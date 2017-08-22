import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stack from '../components/Stack';

class DrawStack extends Component {
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
        return (
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Stack id="draw">
                {this.props.children}
                </Stack>
            </div>
        );
    }
}

export default DrawStack;

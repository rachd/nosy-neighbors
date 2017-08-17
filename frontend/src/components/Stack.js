import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Stack extends Component {
    render() {
        const border = this.props.children ? '2px solid tan' : '2px dashed black';

        return (
        <div style={{
            border: border,
            width: '150px',
            height: '200px',
            margin: '10px'
        }}>
            {this.props.children}
        </div>);
    }
}
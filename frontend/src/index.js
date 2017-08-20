import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import { observe } from './api/Game';

const rootEl = document.getElementById('root');

observe((aceStacks, drawStack) =>
  ReactDOM.render(
    <div className="App"><Board aceStacks={aceStacks} drawStack={drawStack}/></div>,
    rootEl
  )
);

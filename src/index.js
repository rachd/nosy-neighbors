import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
import { observe } from './api/Game';
import fire from './fire';

const rootEl = document.getElementById('root');

observe((aceStacks, drawStack, discardStack, playerStacks) =>
  ReactDOM.render(
    <div className="App"><Board aceStacks={aceStacks} drawStack={drawStack} discardStack={discardStack} playerStacks={playerStacks}/></div>,
    rootEl
  )
);

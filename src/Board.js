import React, { Component } from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends Component {

    createBoard = () => {
      let table = []
      let count = 0
      for (let i = 0; i < 3; ++i) {
        let children = []
        for (let j = 0; j < 3; ++j) {
          children.push(<td>{this.renderSquare(count)}</td>);
          count++;
        }
        table.push(<tr>{children}</tr>);
      }
      return table;
    }
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          ident = {i}
          winners = {this.props.winners}
        />
      );
    }
  
    render() {
      return (
        <table>{this.createBoard()}</table>
      );
    }
  }

  export default Board
import React, { Component } from 'react';
import Square from './Square.js';
import './css/Board.css';

class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

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

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i,0)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}

  export default Board
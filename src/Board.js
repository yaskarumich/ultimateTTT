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
    let champion = false
    let desire = false
    if (this.props.winner) {
      for (let i = 0; i < 3; ++i) {
        if (this.props.winner[i] === this.props.listId) {
          champion = true
        }
      }
    }
    
    if (this.props.focus === this.props.listId) {
      desire = true
    }
    for (let i = 0; i < 3; ++i) {
      let children = []
      for (let j = 0; j < 3; ++j) {
        children.push(<td>{this.renderSquare(count, champion, desire)}</td>);
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

  renderSquare(i, champion, desire) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i,0)}
        champion = {champion}
        type = {this.props.type}
        desire = {desire}
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
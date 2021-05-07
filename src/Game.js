import React, { Component } from 'react';
import Board from './Board.js';
import calculateWinner from './CalculateWinner.js';
import isTie from './IsTie.js';


class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        moves: [
          {}
        ],
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const moves = this.state.moves.concat(i);
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        moves: moves,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const tie = isTie(current.squares);
  
      const moves = history.map((step, move) => {
        const index = this.state.moves[move];
        const row = Math.floor(index / 3);
        const column = (index % 3);
        const desc = move ?
          (this.state.stepNumber === move ? 
          <b><p>Go to move # at ({row+1},{column+1})</p></b> :
          <p>Go to move # at ({row+1},{column+1})</p>
          ): 
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        let tile = winner[0];
        status = "Winner: " + current.squares[tile];
      } else {
        if (tie) {
          status = "Game is Tied!";
        }
        else {
          status = "Next player: " + (this.props.xIsNext ? "X" : "O");
        }
      }
  
      return (
        <span className="game">
          <span className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winners = {winner}
            />
          </span>
          {/* <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div> */}
        </span>
      );
    }
  }

  export default Game
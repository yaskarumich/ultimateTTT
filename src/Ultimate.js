import Board from './Board.js';
import React, { Component } from 'react';
import './css/ultimate.css';
import isTie from './functions/IsTie';
import calculateWinner from './functions/CalculateWinner.js';

class Ultimate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            xIsNext: true,
            history: [{
                squares: Array(9).fill(Array(9).fill(null)),
                won: false,
                focus: null,
                winners: null,
            }],
            stepNumber: 0,
            player1: "", 
            player2: "",
        };
        // WHY?
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        
    }

    handleClick(i,j) {
        // handling history 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        let newArray = history[history.length - 1];
        if (newArray.won) {
            return;
        }
        let squares = newArray.squares.slice();
        let current = squares[j].slice();
        if (current[i] || this.state.board[j] || 
            (newArray.focus !== null && j !== newArray.focus)) {
            return;
        }
        let newFocus = i;
        current[i] = this.state.xIsNext ? 'X' : 'O';
        squares[j] = current;
        const new_board = this.state.board.slice();
        let win = false
        let victors = null
        if (calculateWinner(current)) {
            new_board[j] = current[i];
            victors = calculateWinner(new_board);
            if (victors) {
                win = true
            }
            this.setState({
                board: new_board,
            });
        }
        if (newArray.focus === i) {
            if (new_board[this.state.focus]) {
                newFocus = null;
            }
        }
        if (new_board[i]) {
            newFocus = null;
        }

        this.setState({
            xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares: squares,
                focus: newFocus,
                won: win,
                winners: victors,
            }]),
            stepNumber: history.length,
        })
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }
    handleChange(event) {
        this.setState({
            player1: event.target.value,
        })
    }
    handleChange2(event) {
        this.setState({
            player2: event.target.value,
        })
    }

    render() {
        const history = this.state.history;
        const recent = history[this.state.stepNumber];
        const winner = recent.winners;
        const tie = isTie(this.state.board);
        let type = ""
        let status;
        if (winner) {
            status = 'Winner: ' + this.state.board[winner[0]];
            type = this.state.board[winner[0]];
        } 
        else {
            if (tie) {
                status = "Game is a tie!";
            }
            else {
                let turn = (this.state.xIsNext ? this.state.player1 : this.state.player2)
                status = turn + ' plays: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        const moves = history.map((step, move) => {
            const description = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{description}</button>
              </li>
            );
          });

          const columns = [0,1,2]
          const rows = [0,1,2]
          let index_count = 0
        return(
            <div>
                <label>
                    Player 1:
                    <input type="text" value = {this.state.player1} onChange={this.handleChange} />
                </label>
                <label>
                    Player 2:
                    <input type="text" value = {this.state.player2} onChange={this.handleChange2} />
                </label>
            <h1>{status}</h1>
            <table>
                {rows.map(row => (
                    <tr>
                        {columns.map(val => {
                            let copy = index_count;
                            index_count++;
                            return (
                                <td>
                                    <Board 
                                        squares = {recent.squares[copy]}
                                        onClick = {(i) => this.handleClick(i,copy)}
                                        winner = {winner}
                                        listId = {copy}
                                        type = {type}
                                        focus = {recent.focus}
                                    />
                                </td>
                            )
                        })}  
                    </tr>
                ))}
            </table>
            <ol>{moves}</ol>
            </div>
        )
    }
}

export default Ultimate
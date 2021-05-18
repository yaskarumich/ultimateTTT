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
    // createUltimate = (winner, type) => {
    //     let count = 0
    //     let table = []
    //     for (let r = 0; r < 3; ++r) {
    //         let children = []
    //         for (let c = 0; c < 3; ++c) {
    //             children.push(<td>
    //                 <Board 
    //                     squares = {this.state.squares[count]}
    //                     onClick = {(i) => this.handleClick(i,count)}
    //                     winner = {winner}
    //                     listId = {count}
    //                     type = {type}
    //                     focus = {this.state.focus}
    //                 />
    //             </td>)
    //             count++
    //         }
    //         table.push(children)
    //     }
    //     return table
    // }

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
                <tr>
                    <td>
                        <Board 
                            squares = {recent.squares[0]}
                            onClick = {(i) => this.handleClick(i,0)}
                            winner = {winner}
                            listId = {0}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[1]}
                            onClick = {(i) => this.handleClick(i,1)}
                            winner = {winner}
                            listId = {1}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[2]}
                            onClick = {(i) => this.handleClick(i,2)}
                            winner = {winner}
                            listId = {2}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {recent.squares[3]}
                            onClick = {(i) => this.handleClick(i,3)}
                            winner = {winner}
                            listId = {3}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[4]}
                            onClick = {(i) => this.handleClick(i,4)}
                            winner = {winner}
                            listId = {4}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[5]}
                            onClick = {(i) => this.handleClick(i,5)}
                            winner = {winner}
                            listId = {5}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {recent.squares[6]}
                            onClick = {(i) => this.handleClick(i,6)}
                            winner = {winner}
                            listId = {6}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[7]}
                            onClick = {(i) => this.handleClick(i,7)}
                            winner = {winner}
                            listId = {7}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {recent.squares[8]}
                            onClick = {(i) => this.handleClick(i,8)}
                            winner = {winner}
                            listId = {8}
                            type = {type}
                            focus = {recent.focus}
                            />
                    </td>
                </tr>
                {/* {this.createUltimate(winner, type)} */}
            </table>
            <ol>{moves}</ol>
            </div>
        )
    }
}

export default Ultimate
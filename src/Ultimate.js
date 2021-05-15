import Board from './Board.js';
import React, { Component } from 'react';
import './css/ultimate.css';
import isTie from './functions/IsTie';
import calculateWinner from './functions/CalculateWinner.js';

class Ultimate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(Array(9).fill(null)),
            board: Array(9).fill(null),
            xIsNext: true,
            won: false,
            focus: null,
        };
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
        if (this.state.won) {
            return;
        }
        let newArray = this.state.squares;
        let squares = newArray.slice();
        let current = squares[j].slice();
        if (current[i] || this.state.board[j] || 
            (this.state.focus !== null && j !== this.state.focus)) {
            return;
        }
        let newFocus = i;
        console.log("this is focus: " + this.state.focus);
        console.log("this is newFocus: " + newFocus);
        console.log("this is i: " + i);
        // if (this.state.focus === i) {
        //     if (this.state.board[this.state.focus]) {
        //         newFocus = null;
        //     }
        // }
        // if (this.state.board[this.state.focus]) {
        //     newFocus = null;
        // }
        current[i] = this.state.xIsNext ? 'X' : 'O';
        newArray[j] = current;
        const new_board = this.state.board.slice();
        if (calculateWinner(current)) {
            new_board[j] = current[i];
            if (calculateWinner(new_board)) {
                this.setState({
                    won: !this.state.won,
                });
            }
            this.setState({
                board: new_board,
            });
        }
        if (this.state.focus === i) {
            if (new_board[this.state.focus]) {
                newFocus = null;
            }
        }
        if (new_board[i]) {
            newFocus = null;
        }
        this.setState({
            squares: newArray,
            xIsNext: !this.state.xIsNext,
            focus: newFocus,
        })
    }

    render() {
        const winner = calculateWinner(this.state.board);
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
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        return(
            <table>
                <h1>{status}</h1>
                <tr>
                    <td>
                        <Board 
                            squares = {this.state.squares[0]}
                            onClick = {(i) => this.handleClick(i,0)}
                            winner = {winner}
                            listId = {0}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[1]}
                            onClick = {(i) => this.handleClick(i,1)}
                            winner = {winner}
                            listId = {1}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[2]}
                            onClick = {(i) => this.handleClick(i,2)}
                            winner = {winner}
                            listId = {2}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {this.state.squares[3]}
                            onClick = {(i) => this.handleClick(i,3)}
                            winner = {winner}
                            listId = {3}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[4]}
                            onClick = {(i) => this.handleClick(i,4)}
                            winner = {winner}
                            listId = {4}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[5]}
                            onClick = {(i) => this.handleClick(i,5)}
                            winner = {winner}
                            listId = {5}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {this.state.squares[6]}
                            onClick = {(i) => this.handleClick(i,6)}
                            winner = {winner}
                            listId = {6}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[7]}
                            onClick = {(i) => this.handleClick(i,7)}
                            winner = {winner}
                            listId = {7}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[8]}
                            onClick = {(i) => this.handleClick(i,8)}
                            winner = {winner}
                            listId = {8}
                            type = {type}
                            focus = {this.state.focus}
                            />
                    </td>
                </tr>
                {/* {this.createUltimate(winner, type)} */}
            </table>
        )
    }
}

export default Ultimate
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
        };
    }

    handleClick(i,j) {
        if (this.state.won) {
            return;
        }
        let newArray = this.state.squares;
        let squares = newArray.slice();
        let current = squares[j].slice();
        if (current[i] || this.state.board[j]) {
            return;
        }
        current[i] = this.state.xIsNext ? 'X' : 'O';
        newArray[j] = current;
        if (calculateWinner(current)) {
            const new_board = this.state.board.slice();
            new_board[j] = current[i];
            if (calculateWinner(this.state.board)) {
                this.setState({
                    won: !this.state.won,
                    board: new_board,
                    squares: newArray,
                    xIsNext: !this.state.xIsNext,
                });
            }
            this.setState({
                board: new_board,
                squares: newArray,
                xIsNext: !this.state.xIsNext,
            });
        }
        this.setState({
            squares: newArray, 
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = calculateWinner(this.state.board);
        const tie = isTie(this.state.board);
        let status;
        if (winner) {
            status = 'Winner: ' + this.state.board[winner[0]];
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
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[1]}
                            onClick = {(i) => this.handleClick(i,1)}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[2]}
                            onClick = {(i) => this.handleClick(i,2)}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {this.state.squares[3]}
                            onClick = {(i) => this.handleClick(i,3)}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[4]}
                            onClick = {(i) => this.handleClick(i,4)}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[5]}
                            onClick = {(i) => this.handleClick(i,5)}
                            />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Board 
                            squares = {this.state.squares[6]}
                            onClick = {(i) => this.handleClick(i,6)}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[7]}
                            onClick = {(i) => this.handleClick(i,7)}
                            />
                    </td>
                    <td>
                        <Board 
                            squares = {this.state.squares[8]}
                            onClick = {(i) => this.handleClick(i,8)}
                            />
                    </td>
                </tr>
            </table>
        )
    }
}

export default Ultimate
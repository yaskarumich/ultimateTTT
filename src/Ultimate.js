import Game from './Game.js';
import React, { Component } from 'react';
import './ultimate.css';
class Ultimate extends Component {
    // constructor(props) {
    //     super(props);
    //     this.setState = {
    //         squares: Array(9).fill(Array(9).fill(null)),
    //     }
    // }
    render() {
        return(
            <table className="game-row">
                <tr>
                    <td><Game /></td>
                    <td><Game /></td>
                    <td><Game /></td>
                </tr>
                <tr>
                    <td><Game /></td>
                    <td><Game /></td>
                    <td><Game /></td>
                </tr>
                <tr>
                    <td><Game /></td>
                    <td><Game /></td>
                    <td><Game /></td>
                </tr>
            </table>
        )
    }
}

export default Ultimate
import React from 'react';
import './css/Board.css';

function Square(props) {
    let classes = "square"
    if (props.champion) {
      if (props.type === "X") {
        classes += " X-winner";
      }
      else {
        classes += " O-winner";
      }
    }
    else if (!props.type && props.desire) {
      classes += " desire"
    }
    return (
      <button className={classes} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square
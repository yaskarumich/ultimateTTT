import React, { Component } from 'react';

function Square(props) {
    let classes = "square"
    if (props.winners) {
      for (let j = 0; j < 3; ++j) {
        if (props.ident === props.winners[j]) {
          if (props.value === "X") {
            classes += " X-winner";
          }
          else {
            classes += " O-winner";
          }
        }
      }
    }
    return (
      <button className={classes} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square
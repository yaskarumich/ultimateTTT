function isTie(squares) {
    for (let i = 0; i < 9; ++i) {
      if (!squares[i]) {
        return false;
      }
    }
    return true;
  }

export default isTie
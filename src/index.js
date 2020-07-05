import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        onClick={() => this.props.onClick(i)}
        value={this.props.squares[i]}
      />
    );
  }

  render() {
    return (
      <div className="the-board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Accessibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkFlag: true,
    };
  }

  modeDarkLight() {
    if (this.state.darkFlag === false) {
      this.setState({
        darkFlag: true,
      });
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.850)";
      document.getElementsByClassName("the-board")[0].style.backgroundColor =
        "rgba(35, 35, 35, 0.623)";
      document.getElementsByClassName("the-board")[0].style.boxShadow =
        "0.2vw 0.5vw 1vw 0.15vw rgb(0, 0, 0)";
      document.getElementsByClassName("board-row")[0].style.backgroundColor =
        "rgb(10, 255, 173)";
      document.getElementsByClassName("board-row")[1].style.backgroundColor =
        "rgb(10, 255, 173)";
      document.getElementsByClassName("board-row")[2].style.backgroundColor =
        "rgb(10, 255, 173)";
      document.getElementById("darkLightModeButton").style.backgroundColor =
        "rgba(50, 50, 50)";
      document.getElementsByClassName(
        "accessibility"
      )[0].style.backgroundColor = "rgba(69, 255, 193, 0.842)";
      document.getElementsByClassName("accessibility")[0].style.boxShadow =
        "-0.3vw 0.55vw 0.7vw 0.15vw rgb(0, 0, 0,0.5)";
      document.getElementById("playAgainButton").style.backgroundColor =
        "rgba(50, 50, 50)";
      document.getElementById("resetButton").style.backgroundColor =
        "rgba(50, 50, 50)";
    }
    if (this.state.darkFlag === true) {
      this.setState({
        darkFlag: false,
      });
      document.body.style.backgroundColor = "antiquewhite";
      document.getElementsByClassName("the-board")[0].style.backgroundColor =
        "grey";
      document.getElementsByClassName("the-board")[0].style.boxShadow =
        "0.2vw 0.55vw 1vw 0.15vw rgb(0, 0, 0)";
      document.getElementsByClassName("board-row")[0].style.backgroundColor =
        "wheat";
      document.getElementsByClassName("board-row")[1].style.backgroundColor =
        "wheat";
      document.getElementsByClassName("board-row")[2].style.backgroundColor =
        "wheat";
      document.getElementById("darkLightModeButton").style.backgroundColor =
        "grey";
      document.getElementsByClassName(
        "accessibility"
      )[0].style.backgroundColor = "wheat";
      document.getElementsByClassName("accessibility")[0].style.boxShadow =
        "-0.3vw 0.55vw 0.7vw 0.15vw rgb(0, 0, 0,0.5)";
      document.getElementById("playAgainButton").style.backgroundColor = "grey";
      document.getElementById("resetButton").style.backgroundColor = "grey";
    }
  }

  render() {
    return (
      <div className="accessibility">
        <div className="status">{this.props.status}</div>

        <div className="belowStatus">
          <button
            className="button"
            id="darkLightModeButton"
            onClick={() => this.modeDarkLight()}
          >
            dark | light
          </button>
        </div>

        <div className="game-info">
          Winner's log
          <br></br>X : {this.props.numberOfXWin}
          <br></br>O : {this.props.numberOfOWin}
        </div>

        <div className="buttonAtBottom">
          <button
            className="button"
            id="playAgainButton"
            onClick={() => this.props.onPlayAgainClick()}
          >
            play again
          </button>
          <button
            className="button"
            id="resetButton"
            onClick={() => this.props.onResetClick()}
          >
            reset
          </button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      numberOfXWin: 0,
      numberOfOWin: 0,
      winnerCheck: 0,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "x" : "o";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    if (this.state.winnerCheck === 0) {
      if (calculateWinner(squares) === "x") {
        this.setState({
          numberOfXWin: this.state.numberOfXWin + 1,
          winnerCheck: 1,
        });
      }
      if (calculateWinner(squares) === "o") {
        this.setState({
          numberOfOWin: this.state.numberOfOWin + 1,
          winnerCheck: 1,
        });
      }
    }
  }

  playAgainClick() {
    const squares = this.state.squares.slice();
    squares.fill(null);
    this.setState({
      squares: squares,
      xIsNext: true,
      winnerCheck: 0,
    });
  }

  resetClick() {
    this.setState({
      numberOfXWin: 0,
      numberOfOWin: 0,
      winnerCheck: 0,
    });
    this.playAgainClick();
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = "Winner " + winner;
    } else if (noWinner(this.state.squares, winner)) {
      status = "No Winner";
    } else {
      status = "Next player : " + (this.state.xIsNext ? "x" : "o");
    }

    return (
      <div className="game">
        <Accessibility
          status={status}
          numberOfOWin={this.state.numberOfOWin}
          numberOfXWin={this.state.numberOfXWin}
          onPlayAgainClick={() => this.playAgainClick()}
          onResetClick={() => this.resetClick()}
        />
        <Board
          squares={this.state.squares}
          onClick={(i) => this.handleClick(i)}
        />
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function noWinner(currentSquares, winner) {
  if (
    !winner &&
    currentSquares[0] &&
    currentSquares[1] &&
    currentSquares[2] &&
    currentSquares[3] &&
    currentSquares[4] &&
    currentSquares[5] &&
    currentSquares[6] &&
    currentSquares[7] &&
    currentSquares[8]
  ) {
    return 1;
  }
  return 0;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

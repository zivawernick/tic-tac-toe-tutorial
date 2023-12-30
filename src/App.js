import { useState } from 'react';

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { //board component fully controlled by the props it receives

  /*
  The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to add X to the first ([0] index) square.
  */
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)){
            return;
        }
        if (squares[i]){
            return;
        }
        const nextSquares = squares.slice();
      //slice allows you to store past versions of quares
      if (xIsNext) {
          nextSquares[i] = "X";
      } else {
          nextSquares[i] = "O";
      }
       onPlay(nextSquares);
  }

   const winner = calculateWinner(squares);
   let stautus;
   if (winner) {
       status = 'Winner: ' + winner;
   } else {
       status = 'Next player: ' + (xIsNext ? "X" : "O");
   }

  return (
      <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    //modify to render currently selected move
    const currentSquares = history[currentMove];
    
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        //...history creates a new array that contains all the items in history

    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    const moves = history.map((square, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

//helper function to calculate win
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i< lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }
    return null;

}


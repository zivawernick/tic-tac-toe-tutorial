import { useState } from 'react';

function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


/*Before "Completing the Game"
Each Square component maintains a part of the game’s state. To check for a winner in a tic-tac-toe game, the Board would need to somehow know the state of each of the 9 Square components.
At first, you might guess that the Board needs to “ask” each Square for that Square’s state. 
- this approach is technically possible in React
discouraged it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. 
Instead, the best approach is to store the game’s state in the parent Board component instead of in each Square. 
The Board component can tell each Square what to display by passing a prop, like you did when you passed a number to each Square.
*/
function Board({ xIsNext, squares, onPlay }) { //board component fully controlled by the props it receives
  //moved to Game function const [xIsNext, setXIsNext] = useState(true);
  //moved to Game function const [squares, setSquares] = useState(Array(9).fill(null));

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
      //setSquares(nextSquares);
      //setXIsNext(!xIsNext);
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
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        //...history creates a new array that contains all the items in history
        setXIsNext(!xIsNext);
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{/*todo*/}</ol>
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


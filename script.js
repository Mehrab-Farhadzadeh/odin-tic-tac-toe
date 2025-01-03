const style =
   "color: darkmagenta; font-weight: bold; font-style: italic; font-size: 2em;";
console.log("%cTic Tac Toe", style);
// ***

("use strict");

// Define shapes
const EMPTY = " ";
const CROSS = "X";
const CIRCLE = "O";

function Cell(row, col) {
   return { row, col };
}

function Gameboard() {
   const board = [];

   function setBoard() {
      const rows = 3;
      const cols = 3;
      for (let i = 0; i < rows; i++) {
         board[i] = [];
         for (let j = 0; j < cols; j++) {
            board[i].push(EMPTY);
         }
      }
   }

   function getBoard() {
      return board;
   }

   function updateCell(cell, shape) {
      if (board[cell.row][cell.col] !== EMPTY) return;
      board[cell.row][cell.col] = shape;
   }

   function logBoard() {
      for (const row of board) {
         let rowStr = "";
         for (const cell of row) {
            rowStr += `${cell} | `;
         }
         console.log(rowStr);
      }
   }
   return { updateCell, logBoard, getBoard, setBoard };
}

function User(name, email) {
   const sayHi = function () {
      console.log(`Hi, ${name} speaking.`);
   };
   return { name, email, sayHi };
}

function Player(name, shape) {
   const { sayHi } = User(name);
   let score = 0;
   function win() {
      sayHi();
      this.score++;
   }
   return { name, shape, score, win, sayHi };
}

function GameFlow(playerOneName = "Player One", playerTwoName = "Player Two") {
   const gameboard = Gameboard();
   gameboard.setBoard();
   const players = [
      Player(playerOneName, CIRCLE),
      Player(playerTwoName, CROSS),
   ];

   let turn = 0;
   let isRoundFinished_ = false;
   let round = 0;
   let isGameFinished_ = false;

   function isPlayerWinner(board, row, col) {
      function isRowWinner(board, row) {
         for (let col = 1; col < board[row].length; col++) {
            if (board[row][col - 1] !== board[row][col]) return false;
         }
         return true;
      }
      function isColWinner(board, col) {
         for (let row = 1; row < board.length; row++) {
            if (board[row - 1][col] !== board[row][col]) return false;
         }
         return true;
      }
      function isADiagonalWinner(board, row, col) {
         if (board[1][1] === EMPTY) return false;
         // console.log(board);
         const isPrimaryDiaWinner =
            new Set([board[0][0], board[1][1], board[2][2]]).size === 1; // Check if they are the same
         const isSecondaryDiaWinner =
            new Set([board[0][2], board[1][1], board[2][0]]).size === 1;

         // console.log(isPrimaryDiaWinner, isSecondaryDiaWinner);
         return isPrimaryDiaWinner || isSecondaryDiaWinner;
      }

      return (
         isRowWinner(board, row) ||
         isColWinner(board, col) ||
         isADiagonalWinner(board, row, col)
      );
   }

   function resetRound(activePlayer) {
      if (activePlayer) activePlayer.win();
      turn = 0;
      round++;
      gameboard.setBoard();
      isRoundFinished_ = true;
   }

   function resetGame() {
      resetRound();
      isGameFinished_ = true;
      round = 0;
   }

   function getActivePlayer() {
      return players[turn % 2];
   }

   function isGameFinished() {
      return isGameFinished_;
   }

   function isRoundFinished() {
      return isRoundFinished_;
   }

   function playTurn(cell) {
      if (gameboard.getBoard()[cell.row][cell.col] !== EMPTY) return;
      
      const activePlayer = getActivePlayer();
      gameboard.updateCell(cell, activePlayer.shape);

      if (isPlayerWinner(gameboard.getBoard(), cell.row, cell.col)) {
         resetRound(activePlayer);
         return;
      }
      turn++;

      if (turn === 9) {
         resetRound();
      }
   }

   return {
      playTurn,
      getBoard: gameboard.getBoard,
      getActivePlayer,
      isRoundFinished,
      isGameFinished,
      // getRoundResult,
   };
}

const displayLogic = (function () {
   const boardEl = document.createElement("div");

   function displayCol(rowEl, col, colIdx) {
      const colEl = document.createElement("div");
      colEl.className = `cell ${col}`;
      colEl.dataset.index = colIdx;
      colEl.textContent = col;
      rowEl.append(colEl);
   }

   function displayRow(boardEl, row, rowIdx) {
      const rowEl = document.createElement("div");
      rowEl.className = `row ${rowIdx}`;
      rowEl.dataset.index = rowIdx;
      row.forEach((col, index) => {
         displayCol(rowEl, col, index);
         boardEl.append(rowEl);
      });
   }

   function addBoardToDOM(game) {
      boardEl.innerHTML = "";
      boardEl.className = `board ${game.getActivePlayer().shape}Turn`;
      game.getBoard().forEach((row, index) => {
         displayRow(boardEl, row, index);
      });
      document.body.append(boardEl);
   }

   function update(game) {
      addBoardToDOM(game);
   }

   return { update };
})();

function handleEventAndPlayGame() {
   // initiate game
   const game = GameFlow();
   displayLogic.update(game);

   // Add handler
   function extractCell(event) {
      const row = event.target.parentNode.dataset.index;
      const col = event.target.dataset.index;
      return Cell(row, col);
   }
   const boardEl = document.querySelector(".board");
   function handleClick(e) {
      const cell = extractCell(e);
      game.playTurn(cell, game.getActivePlayer());
      displayLogic.update(game);
   }
   boardEl.addEventListener("click", handleClick);
}

handleEventAndPlayGame();

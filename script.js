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
   const players = [
      Player(playerOneName, CIRCLE),
      Player(playerTwoName, CROSS),
   ];

   // I keep this function commented here for the purpose of testing
   function getPlayerChosenCell(player) {
      const board = gameboard.getBoard();
      let row = 0,
         col = 0;
      do {
         row = Math.floor(Math.random() * 3);
         col = Math.floor(Math.random() * 3);
      } while (board[row][col] !== EMPTY);

      return Cell(row, col);
   }

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

   function playTurn(cell, player) {
      gameboard.updateCell(cell, player.shape);
   }

   function printTurn(turn) {
      console.log("Turn:", turn + 1);
      gameboard.logBoard();
   }

   function getActivePlayer(turn) {
      return players[turn % 2];
   }

   function playRound() {
      for (let turn = 0; turn < 9; turn++) {
         const activePlayer = getActivePlayer(turn);
         const cell = getPlayerChosenCell(activePlayer);
         playTurn(cell, activePlayer);
         // console.log(cell);
         // printTurn(turn);
         if (isPlayerWinner(gameboard.getBoard(), cell.row, cell.col)) {
            activePlayer.win();
            return;
         }
      }
      console.log("%cDraw", "color: gray");
   }

   function play(rounds) {
      for (let round = 0; round < rounds; round++) {
         console.group("Round:", round + 1);
         gameboard.setBoard();
         playRound();
         console.groupEnd();
      }
      // Display result
      console.log(players[0], players[1]);
   }
   return { play, getBoard: gameboard.getBoard, getActivePlayer };
}

function displayLogic() {
   const game = GameFlow();
   game.play(1);

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

   function displayBoard(gameboard) {
      const boardEl = document.createElement("div");
      let turn = Math.floor(Math.random() * 2);
      boardEl.className = `board ${game.getActivePlayer(turn).shape}Turn`;
      gameboard.forEach((row, index) => {
         displayRow(boardEl, row, index);
      });
      document.body.append(boardEl);
   }

   displayBoard(game.getBoard());
}

displayLogic();

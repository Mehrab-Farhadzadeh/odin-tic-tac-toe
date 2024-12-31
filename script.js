const style =
   "color: darkmagenta; font-weight: bold; font-style: italic; font-size: 2em;";
console.log("%cTic Tac Toe", style);
// ***

("use strict");

// Define shapes
const EMPTY = " ";
const CROSS = "X";
const CIRCLE = "O";

function Room(row, col) {
   return { row, col };
}

const Gameboard = (function () {
   const gameboard = [];

   function setGameboard() {
      const rows = 3;
      const cols = 3;
      for (let i = 0; i < rows; i++) {
         gameboard[i] = [];
         for (let j = 0; j < cols; j++) {
            gameboard[i].push(EMPTY);
         }
      }
   }

   function getGameboard() {
      return gameboard;
   }

   function updateRoom(room, shape) {
      if (gameboard[room.row][room.col] !== EMPTY) return;
      gameboard[room.row][room.col] = shape;
   }

   function logGameboard() {
      for (const row of gameboard) {
         let rowStr = "";
         for (const room of row) {
            rowStr += `${room} | `;
         }
         console.log(rowStr);
      }
   }
   return { updateRoom, logGameboard, getGameboard, setGameboard };
})();

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

const GameFlow = (function (
   playerOneName = "Player One",
   playerTwoName = "Player Two"
) {
   const players = [
      Player(playerOneName, CIRCLE),
      Player(playerTwoName, CROSS),
   ];
   function getPlayerChosenRoom(player) {
      const board = Gameboard.getGameboard();
      let row = 0,
         col = 0;
      do {
         row = Math.floor(Math.random() * 3);
         col = Math.floor(Math.random() * 3);
      } while (board[row][col] !== EMPTY);
      // [row, col] = prompt(`Choice for ${player.shape}?`).split(" ").map(Number);

      return Room(row, col);
   }

   function isPlayerWinner(gameboard, row, col) {
      function isRowWinner(gameboard, row) {
         for (let col = 1; col < gameboard[row].length; col++) {
            if (gameboard[row][col - 1] !== gameboard[row][col]) return false;
         }
         return true;
      }
      function isColWinner(gameboard, col) {
         for (let row = 1; row < gameboard.length; row++) {
            if (gameboard[row - 1][col] !== gameboard[row][col]) return false;
         }
         return true;
      }
      function isADiagonalWinner(gameboard, row, col) {
         if (gameboard[1][1] === EMPTY) return false;
         // console.log(gameboard);
         const isPrimaryDiaWinner =
            new Set([gameboard[0][0], gameboard[1][1], gameboard[2][2]])
               .size === 1; // Check if they are the same
         const isSecondaryDiaWinner =
            new Set([gameboard[0][2], gameboard[1][1], gameboard[2][0]])
               .size === 1;

         // console.log(isPrimaryDiaWinner, isSecondaryDiaWinner);
         return isPrimaryDiaWinner || isSecondaryDiaWinner;
      }

      return (
         isRowWinner(gameboard, row) ||
         isColWinner(gameboard, col) ||
         isADiagonalWinner(gameboard, row, col)
      );
   }

   function playTurn(room, player) {
      Gameboard.updateRoom(room, player.shape);
   }

   function printTurn(turn) {
      console.log("Turn:", turn + 1);
      Gameboard.logGameboard();
   }

   function getActivePlayer(players, turn) {
      return players[turn % 2];
   }

   function playRound() {
      // play round
      for (let turn = 0; turn < 9; turn++) {
         const activePlayer = getActivePlayer(players, turn);
         const room = getPlayerChosenRoom(activePlayer);
         playTurn(room, activePlayer);
         // console.log(room);
         // printTurn(turn);
         if (isPlayerWinner(Gameboard.getGameboard(), room.row, room.col)) {
            activePlayer.win();
            return;
         }
      }
      console.log("%cDraw", "color: gray");
   }

   function playGame(rounds) {
      for (let round = 0; round < rounds; round++) {
         console.group("Round:", round + 1);
         Gameboard.setGameboard();
         playRound();
         console.groupEnd();
      }
      // Display result
      console.log(players[0], players[1]);
   }
   return { playGame };
})();

GameFlow.playGame(5);

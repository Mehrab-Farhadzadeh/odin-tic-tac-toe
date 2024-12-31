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
   const rows = 3;
   const cols = 3;
   const gameboard = [];
   for (let i = 0; i < rows; i++) {
      gameboard[i] = [];
      for (let j = 0; j < cols; j++) {
         gameboard[i].push(EMPTY);
      }
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
   function getGameboard() {
      return gameboard;
   }
   return { updateRoom, logGameboard, getGameboard };
})();

function User(name, email) {
   const sayHi = function () {
      console.log(`Hi, ${name} speaking.`);
   };
   return { name, email, sayHi };
}

function Player(name, shape) {
   const { sayHi } = User(name);
   score = 0;
   function win() {
      score++;
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
      const [row, col] = prompt(`Choice for ${player.shape}?`)
         .split(" ")
         .map(Number);
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
         // Check if player's move is on a diagonal
         if ((col + row) % 2 !== 0) return false;
         const isPrimaryDiaWinner =
            new Set([gameboard[0][0], gameboard[1][1], gameboard[2][2]])
               .size === 1; // Check if they are the same
         const isSecondaryDiaWinner =
            new Set([gameboard[0][2], gameboard[1][1], gameboard[2][0]])
               .size === 1;
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
         printTurn(turn);
         if (isPlayerWinner(Gameboard.getGameboard(), room.row, room.col))
            return activePlayer;
      }
      return "Draw";
   }

   function playGame(rounds) {
      for (let round = 0; round < rounds; round++) {
         const winningPlayer = playRound();
         if (winningPlayer !== "Draw") winningPlayer.win();
      }
   }
   return { playGame };
})();

GameFlow.playGame(1);

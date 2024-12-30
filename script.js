const style =
   "color: darkmagenta; font-weight: bold; font-style: italic; font-size: 2em;";
console.log("%cTic Tac Toe", style);
// ***

("use strict");

// Define shapes
const EMPTY = " ";
const CROSS = "X";
const CIRCLE = "O";

const Gameboard = (function () {
   const gameboard = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
   ];
   return {
      updateRoom: function (row, col, shape) {
         if (gameboard[row][col] !== EMPTY) return;
         gameboard[row][col] = shape;
      },
      logGameboard: function () {
         for (const row of gameboard) {
            let rowStr = "";
            for (const room of row) {
               rowStr += `${room} | `;
            }
            console.log(rowStr);
         }
      },
      getGameboard: function () {
         return gameboard;
      },
   };
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

const isPlayerWinner = (function () {
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
   function isDiagonalWinner(gameboard, row, col) {
      // Check if player's play is on a diagonal
      if ((col + row) % 2 !== 0) return false;
      const isPrimaryDiaWinner =
         new Set([gameboard[0][0], gameboard[1][1], gameboard[2][2]]).size ===
         1;
      const isSecondaryDiaWinner =
         new Set([gameboard[0][2], gameboard[1][1], gameboard[2][0]]).size ===
         1;

      return isPrimaryDiaWinner || isSecondaryDiaWinner;
   }

   function check(gameboard, row, col) {
      return (
         isRowWinner(gameboard, row) ||
         isColWinner(gameboard, col) ||
         isDiagonalWinner(gameboard, row, col)
      );
   }

   return { check };
})();

const GameFlow = (function () {
   const players = [Player("one", CIRCLE), Player("two", CROSS)];
   function getThePlayerChoice(player) {
      const choice = prompt(`Choice for ${player.shape}?`);
      return choice.split(" ").map(Number);
   }

   return {
      play: function () {
         for (let turn = 1; turn <= 9; turn++) {
            const [row, col] = getThePlayerChoice(players[turn % 2]);
            Gameboard.updateRoom(row, col, players[turn % 2].shape);
            console.log("Turn:", turn);
            Gameboard.logGameboard();
         }
         return "Draw";
      },
   };
})();

GameFlow.play();

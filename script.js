const style =
   "color: darkmagenta; font-weight: bold; font-style: italic; font-size: 2em;";
console.log("%cTic Tac Toe", style);
// ***

("use strict");

// Define const values
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
      updateState: function (row, col, newState) {
         if (gameboard[row][col] !== EMPTY) return;
         gameboard[row][col] === newState;
         Gameboard.logGameboard();
         GameFlow.checkIfWins(row, col);
      },
      logGameboard: function () {
         for (const row of gameboard) {
            let rowStr = "";
            for (const house of row) {
               rowStr += `${house} | `;
            }
            console.log(rowStr);
         }
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

const GameFlow = (function () {
   return {
      start: function () {
         Gameboard.logGameboard();
      },
      checkIfWins: function (row, col) {
         Gameboard.gameboard[row][col];
         // Check if it wins
      },
   };
})();

GameFlow.start();

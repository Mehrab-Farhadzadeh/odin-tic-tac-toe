const style =
   "color: darkmagenta; font-weight: bold; font-style: italic; font-size: 2em;";
console.log("%cTic Tac Toe", style);
// ***

("use strict");

// Define shapes
const EMPTY = " ";
const CROSS = "X";
const CIRCLE = "O";

function doesItWin(gameboard, row, col) {
   gameboard[row][col];
   // Check if it wins
   return false;
}

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
   const players = [Player("one", CIRCLE), Player("two", CROSS)];
   function getThePlayerChoice(player) {
      const choice = prompt(`Choice for ${player.shape}?`);
      return choice.split(" ").map(Number);
   }

   return {
      start: function () {
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

GameFlow.start();

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DaySixInput.txt');

let sum = 0;
let map = [];
let guardPosition = { row: 0, col: 0 };
let direction = 'up';
let history = [];

function parseOrderData() {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\r\n');
  for (const line of lines) {
    map.push(line.split(''));
  }
}

function getInitialGuardPosition() {
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    const colIndex = row.findIndex((tile) => tile === '^');
    if (colIndex !== -1) {
      guardPosition = { row: rowIndex, col: colIndex };
      map[rowIndex][colIndex] = 'X';
    }
  }
}

function handleGuardMovement() {
  while (!isGameOver()) {
    switch (direction) {
      case 'up':
        if (map[guardPosition.row - 1][guardPosition.col] === '#') {
          direction = 'right';
        } else {
          map[guardPosition.row - 1][guardPosition.col] = 'X';
          guardPosition.row = guardPosition.row - 1;
        }
        break;
      case 'right':
        if (map[guardPosition.row][guardPosition.col + 1] === '#') {
          direction = 'down';
        } else {
          map[guardPosition.row][guardPosition.col + 1] = 'X';
          guardPosition.col = guardPosition.col + 1;
        }
        break;
      case 'down':
        if (map[guardPosition.row + 1][guardPosition.col] === '#') {
          direction = 'left';
        } else {
          map[guardPosition.row + 1][guardPosition.col] = 'X';
          guardPosition.row = guardPosition.row + 1;
        }
        break;
      case 'left':
        if (map[guardPosition.row][guardPosition.col - 1] === '#') {
          direction = 'up';
        } else {
          map[guardPosition.row][guardPosition.col - 1] = 'X';
          guardPosition.col = guardPosition.col - 1;
        }
        break;
    }
  }
  countXTiles();
}

function isGameOver() {
  switch (direction) {
    case 'up':
      if (guardPosition.row === 0) return true;
    case 'right':
      if (guardPosition.col === map[guardPosition.row].length - 1) return true;
    case 'down':
      if (guardPosition.row === map.length - 1) return true;
    case 'left':
      if (guardPosition.col === 0) return true;
    default:
      return false;
  }
}

function countXTiles() {
  for (const row of map) {
    for (const tile of row) {
      if (tile === 'X') {
        sum++;
      }
    }
  }
  console.log(sum);
}

parseOrderData();
getInitialGuardPosition();
handleGuardMovement();

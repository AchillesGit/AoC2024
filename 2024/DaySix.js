const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DaySixInput.txt');

let sum = 0;
let map = [];
let initialMap = [];
let guardPosition = { row: 0, col: 0 };
let direction = 'up';
let history = [];

function parseOrderData() {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\r\n');
  for (const line of lines) {
    initialMap.push(line.split(''));
  }
}

function getInitialGuardPosition() {
  for (let rowIndex = 0; rowIndex < initialMap.length; rowIndex++) {
    const row = initialMap[rowIndex];
    const colIndex = row.findIndex((tile) => tile === '^' || tile === 'X');
    if (colIndex !== -1) {
      direction = 'up';
      guardPosition = { row: rowIndex, col: colIndex };
      initialMap[rowIndex][colIndex] = 'X';
    }
  }
}

function handleGuardMovement() {
  for (let i = 0; i < initialMap.length; i++) {
    const row = initialMap[i];
    for (let j = 0; j < row.length; j++) {
      console.log(i);
      console.log(j);

      getInitialGuardPosition();
      map = JSON.parse(JSON.stringify(initialMap));
      map[i][j] = '#';
      history = [];

      while (!isGameOver()) {
        const newHistoryEntry = {
          direction: direction,
          position: {
            row: guardPosition.row,
            col: guardPosition.col,
          },
        };

        if (checkDuplicationInHistory(newHistoryEntry)) break;

        history.push(newHistoryEntry);

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
    }
  }
  console.log(sum);
}

function checkDuplicationInHistory(newHistoryEntry) {
  for (const item of history) {
    if (
      item.direction === newHistoryEntry.direction &&
      item.position.row === newHistoryEntry.position.row &&
      item.position.col === newHistoryEntry.position.col
    ) {
      sum++;
      return true;
    }
  }
  return false;
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

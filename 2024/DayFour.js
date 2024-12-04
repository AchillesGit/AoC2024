const fs = require('fs');
const path = require('path');

let sum = 0;
let twoD_Array = [];
let cols = 0;
let rows = 0;
let searchVectors = [
  [
    { row: -1, col: 0, char: 'M' },
    { row: -2, col: 0, char: 'A' },
    { row: -3, col: 0, char: 'S' },
  ],
  [
    { row: -1, col: 1, char: 'M' },
    { row: -2, col: 2, char: 'A' },
    { row: -3, col: 3, char: 'S' },
  ],
  [
    { row: 0, col: 1, char: 'M' },
    { row: 0, col: 2, char: 'A' },
    { row: 0, col: 3, char: 'S' },
  ],
  [
    { row: 1, col: 1, char: 'M' },
    { row: 2, col: 2, char: 'A' },
    { row: 3, col: 3, char: 'S' },
  ],
  [
    { row: 1, col: 0, char: 'M' },
    { row: 2, col: 0, char: 'A' },
    { row: 3, col: 0, char: 'S' },
  ],
  [
    { row: 1, col: -1, char: 'M' },
    { row: 2, col: -2, char: 'A' },
    { row: 3, col: -3, char: 'S' },
  ],
  [
    { row: 0, col: -1, char: 'M' },
    { row: 0, col: -2, char: 'A' },
    { row: 0, col: -3, char: 'S' },
  ],
  [
    { row: -1, col: -1, char: 'M' },
    { row: -2, col: -2, char: 'A' },
    { row: -3, col: -3, char: 'S' },
  ],
];

const filePath = path.join(__dirname, 'DayFourInput.txt');
// validateXmasPatterns();
function validateXmasPatterns() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    const lines = data.split('\r\n');
    for (const line of lines) {
      twoD_Array.push(line.split(''));
    }
    rows = twoD_Array.length;
    cols = twoD_Array[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (twoD_Array[r][c] === 'X') {
          for (const vector of searchVectors) {
            let isXmas = true;
            for (let i = 0; i < 3; i++) {
              let searchRow = r + vector[i].row;
              let searchCol = c + vector[i].col;
              if (searchRow > rows - 1) {
                if (searchCol !== 0) {
                  isXmas = false;
                  break;
                }
                searchRow = searchRow % rows;
              } else if (searchRow < 0) {
                if (searchCol !== 0) {
                  isXmas = false;
                  break;
                }
                searchRow = rows + searchRow;
              }
              if (searchCol > cols - 1) {
                if (searchRow !== 0) {
                  isXmas = false;
                  break;
                }
                searchCol = searchCol % cols;
              } else if (searchCol < 0) {
                if (searchRow !== 0) {
                  isXmas = false;
                  break;
                }
                searchCol = cols + searchCol;
              }

              if (twoD_Array[searchRow][searchCol] !== vector[i].char) {
                isXmas = false;
                break;
              }
            }
            if (isXmas) {
              sum++;
            }
          }
        }
      }
    }
  });
}

let searchVectorsV2 = [
  [
    { row: -1, col: -1, char: 'M' },
    { row: 1, col: -1, char: 'M' },
    { row: 1, col: 1, char: 'S' },
    { row: -1, col: 1, char: 'S' },
  ],
  [
    { row: -1, col: -1, char: 'M' },
    { row: -1, col: 1, char: 'M' },
    { row: 1, col: 1, char: 'S' },
    { row: 1, col: -1, char: 'S' },
  ],
  [
    { row: 1, col: 1, char: 'M' },
    { row: -1, col: 1, char: 'M' },
    { row: 1, col: -1, char: 'S' },
    { row: -1, col: -1, char: 'S' },
  ],
  [
    { row: 1, col: 1, char: 'M' },
    { row: 1, col: -1, char: 'M' },
    { row: -1, col: 1, char: 'S' },
    { row: -1, col: -1, char: 'S' },
  ],
];

validateXmasPatternsV2();

function validateXmasPatternsV2() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    const lines = data.split('\r\n');
    for (const line of lines) {
      twoD_Array.push(line.split(''));
    }
    rows = twoD_Array.length;
    cols = twoD_Array[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (twoD_Array[r][c] === 'A') {
          for (const vector of searchVectorsV2) {
            let isXmas = true;
            for (let i = 0; i < 4; i++) {
              let searchRow = r + vector[i].row;
              let searchCol = c + vector[i].col;
              if (
                searchRow > rows - 1 ||
                searchRow < 0 ||
                searchCol > cols - 1 ||
                searchCol < 0 ||
                twoD_Array[searchRow][searchCol] !== vector[i].char
              ) {
                isXmas = false;
                break;
              }
            }
            if (isXmas) {
              sum++;
            }
          }
        }
      }
    }
    console.log(sum);
  });
}

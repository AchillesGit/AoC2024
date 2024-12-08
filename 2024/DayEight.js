const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DayEightInput.txt');

let sum = 0;
let parsedData = [];
let antiNodes = [];

function parseOrderData() {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\r\n');
  for (const line of lines) {
    parsedData.push(line.split(''));
  }
}

function findPairs(source, sourceRow, sourceCol) {
  for (let row = 0; row < parsedData.length; row++) {
    const line = parsedData[row];
    for (let col = 0; col < line.length; col++) {
      if (row === sourceRow && col === sourceCol) {
        continue;
      }

      const element = line[col];

      if (element !== source) {
        continue;
      }

      if (!antiNodes.some((node) => node.row === row && node.col === col)) {
        antiNodes.push({ row: row, col: col });
      }

      let counter = 0;

      while (true) {
        counter++;
        const colDestination = col + (col - sourceCol) * counter;
        const rowDestination = row + (row - sourceRow) * counter;

        if (
          colDestination < 0 ||
          rowDestination < 0 ||
          colDestination > line.length - 1 ||
          rowDestination > parsedData.length - 1
        ) {
          break;
        }

        if (
          antiNodes.some(
            (node) => node.row === rowDestination && node.col === colDestination
          )
        ) {
          continue;
        }

        antiNodes.push({ row: rowDestination, col: colDestination });
      }
    }
  }
}

parseOrderData();

for (let row = 0; row < parsedData.length; row++) {
  const line = parsedData[row];
  for (let col = 0; col < line.length; col++) {
    const element = line[col];
    if (element !== '.') {
      findPairs(element, row, col);
    }
  }
}

antiNodes.sort((a, b) => {
  return a.row - b.row;
});

console.log(antiNodes);
console.log(antiNodes.length);

// for (let row = 0; row < parsedData.length; row++) {
//   const line = parsedData[row];
//   let str = '';
//   for (let col = 0; col < line.length; col++) {
//     const element = line[col];
//     const isAntiNode = antiNodes.some(
//       (node) => node.row === row && node.col === col
//     );
//     if (element !== '.' && isAntiNode) {
//       str += 'T';
//     } else if (isAntiNode) {
//       str += '#';
//     } else {
//       str += element;
//     }
//   }
//   console.log(str);
// }

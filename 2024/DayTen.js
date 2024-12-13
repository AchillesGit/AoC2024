const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DayTenInput.txt');

let sum = 0;
let data = [];
let trailHeads = [];

function readData() {
  const input = fs.readFileSync(filePath, 'utf8');

  const chars = input.split('\r\n');

  for (const char of chars) {
    data.push(char.split('').map((element) => Number(element)));
  }
}

readData();
console.log(data);

function findStartPoints() {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const element = data[row][col];
      if (element === 0) {
        trailHeads.push({ row: row, col: col });
      }
    }
  }
}

findStartPoints();

function findPaths() {
  for (const trailHead of trailHeads) {
    let tree = [trailHead];
    for (let i = 1; i < 10; i++) {
      let newTree = [];
      for (const node of tree) {
        const row = node.row;
        const col = node.col;
        if (row !== 0 && data[row - 1][col] === i) {
          newTree.push({ row: row - 1, col: col });
        }
        if (row !== data.length - 1 && data[row + 1][col] === i) {
          newTree.push({ row: row + 1, col: col });
        }
        if (col !== 0 && data[row][col - 1] === i) {
          newTree.push({ row: row, col: col - 1 });
        }
        if (col !== data[row].length - 1 && data[row][col + 1] === i) {
          newTree.push({ row: row, col: col + 1 });
        }
      }
      tree = newTree;
    }
    console.log(tree);
    // evaluateTree(tree);
    sum += tree.length;
  }
}

// function evaluateTree(tree) {
//   let distinctTrailTails = [];
//   for (const element of tree) {
//     if (
//       !distinctTrailTails.some(
//         (el) => el.row === element.row && el.col === element.col
//       )
//     ) {
//       distinctTrailTails.push(element);
//     }
//   }
//   sum += distinctTrailTails.length;
// }

findPaths();

console.log(sum);

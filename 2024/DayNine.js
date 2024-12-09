const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DayNineInput.txt');

let sum = 0;
let data = [];
let parsedData = [];

function readData() {
  const input = fs.readFileSync(filePath, 'utf8');
  const chars = input.split('');
  for (const char of chars) {
    data.push(char);
  }
}

readData();

function parseData() {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    for (let j = 0; j < element; j++) {
      if (i % 2 === 0) {
        parsedData.push(i / 2);
      } else {
        parsedData.push('.');
      }
    }
  }
}

parseData();

function sortParsedData() {
  for (let i = 0; i < parsedData.length; i++) {
    let firstPointIndex = -1;
    let lastNumberIndex = -1;
    let lastNumber = '';
    for (let j = i; j < parsedData.length; j++) {
      let element = parsedData[j];
      if (firstPointIndex === -1 && element === '.') {
        firstPointIndex = j;
      } else if (element !== '.') {
        lastNumberIndex = j;
        lastNumber = element;
      }
    }
    if (firstPointIndex < lastNumberIndex) {
      parsedData[firstPointIndex] = lastNumber;
      parsedData[lastNumberIndex] = '.';
    }
  }
}

sortParsedData();

function calculateSum() {
  for (let i = 0; i < parsedData.length; i++) {
    const element = parsedData[i];
    if (element === '.') continue;
    sum += i * element;
  }
}

calculateSum();
console.log(parsedData);
console.log(sum);

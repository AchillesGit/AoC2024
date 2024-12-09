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
  let lastElement = '.';
  for (let i = parsedData.length - 1; i >= 0; i--) {
    const element = parsedData[i];
    if (element !== '.' && lastElement !== element) {
      lastElement = element;
      const startIndex = parsedData.findIndex((data) => data === element);
      const lenOfNumbers = i - startIndex + 1;
      console.log(element, lenOfNumbers);
      let followingDots = 0;
      for (let j = 0; j < parsedData.length; j++) {
        const isDot = parsedData[j] === '.';
        if (isDot) {
          followingDots++;
        } else {
          followingDots = 0;
        }

        if (followingDots === lenOfNumbers && j < i) {
          for (let k = 0; k < lenOfNumbers; k++) {
            parsedData[k + startIndex] = '.';
            parsedData[k + j - lenOfNumbers + 1] = element;
          }
          j = parsedData.length;
        }
      }
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

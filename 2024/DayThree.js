const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DayThreeInput.txt');
const acceptableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];

function calculateMultiplicationSumV1() {
  let sum = 0;
  fs.readFile(filePath, 'utf8', (err, data) => {
    const startOfMul = data.split('mul(');
    for (const start of startOfMul) {
      const innerMul = start.split(')')[0];
      let valid = true;
      for (const element of innerMul) {
        if (!acceptableChars.includes(element)) {
          valid = false;
          break;
        }
      }
      if (valid) {
        const first = innerMul.split(',')[0];
        const second = innerMul.split(',')[1];
        sum += first * second;
      }
    }
  });
}

calculateMultiplicationSumV2();

function calculateMultiplicationSumV2() {
  let sum = 0;
  fs.readFile(filePath, 'utf8', (err, data) => {
    data = filterInput(data);
    const startOfMul = data.split('mul(');
    for (const start of startOfMul) {
      const innerMul = start.split(')')[0];
      let valid = true;
      for (const element of innerMul) {
        if (!acceptableChars.includes(element)) {
          valid = false;
          break;
        }
      }
      if (valid) {
        const first = innerMul.split(',')[0];
        const second = innerMul.split(',')[1];
        sum += first * second;
      }
    }
  });
}

function filterInput(input = '') {
  let active = true;
  let returnString = '';
  for (let i = 0; i < input.length; i++) {
    const element = input.charAt(i);
    if (active && input.substring(i).startsWith("don't()")) {
      active = false;
    } else if (!active && input.substring(i).startsWith('do()')) {
      active = true;
    }
    if (active) returnString += element;
  }

  return returnString;
}

const fs = require('fs');
const path = require('path');

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const numberStrings = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
let sum = 0;

const filePath = path.join(__dirname, 'DayOneInput.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
  const lines = data.split('\n');
  for (const line of lines) {
    let firstNum = undefined;
    let secondNum = undefined;
    for (let i = 0; i < line.length; i++) {
      const substr = line.substring(i);
      let val = numberStrings.findIndex((num) => substr.startsWith(num));
      if (val !== -1) {
        val++;
        if (!firstNum) {
          firstNum = val;
          secondNum = val;
        } else {
          secondNum = val;
        }
      } else {
        const char = line[i];
        const isNumber = numbers.includes(char);
        if (isNumber && !firstNum) {
          firstNum = char;
          secondNum = char;
        } else if (isNumber) {
          secondNum = char;
        }
      }
    }
    sum += Number(firstNum + '' + secondNum);
  }
  console.log(sum);
});

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DayFiveInput.txt');

let orderRules = [];
let prints = [];
let sum = 0;

function parseOrderData() {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\r\n');
  orderRules = lines
    .filter((line) => line.includes('|'))
    .map((line) => {
      const sides = line.split('|');
      return { left: sides[0], right: sides[1] };
    });
  prints = lines
    .filter((line) => line.includes(','))
    .map((line) => line.split(','));
}

function checkCorrectOrders() {
  for (const printLine of prints) {
    let lineIsValid = true;
    for (let printIndex = 0; printIndex < printLine.length; printIndex++) {
      const printNumber = printLine[printIndex];
      const correctLeft = checkLeftOrderRules(
        printNumber,
        printIndex,
        printLine
      );
      if (!correctLeft) {
        lineIsValid = false;
        break;
      }
      const correctRight = checkRightOrderRules(
        printNumber,
        printIndex,
        printLine
      );
      if (!correctRight) {
        lineIsValid = false;
        break;
      }
    }
    if (lineIsValid) {
      handleCorrectLine(printLine);
    }
  }
}

function checkLeftOrderRules(printNumber, printIndex, printLine) {
  const relevantRules = orderRules.filter((rule) => rule.left === printNumber);
  const printsThatMustBeAfter = relevantRules.map((rule) => rule.right);
  const printsThatAreBefore = [...printLine].splice(0, printIndex);
  for (const print of printsThatAreBefore) {
    if (printsThatMustBeAfter.includes(print)) {
      return false;
    }
  }
  return true;
}

function checkRightOrderRules(printNumber, printIndex, printLine) {
  const relevantRules = orderRules.filter((rule) => rule.right === printNumber);
  const printsThatMustBeBefore = relevantRules.map((rule) => rule.left);
  const printsThatAreAfter = [...printLine].splice(printIndex + 1);
  for (const print of printsThatAreAfter) {
    if (printsThatMustBeBefore.includes(print)) {
      return false;
    }
  }
  return true;
}

function handleCorrectLine(line) {
  const lineLength = line.length;
  sum += Number(line[Math.floor(lineLength / 2)]);
}

parseOrderData();
checkCorrectOrders();
console.log(sum);
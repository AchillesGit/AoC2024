const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'DaySevenInput.txt');

let sum = 0;
let parsedData = [];
let tree = [];

function parseOrderData() {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\r\n');
  for (const line of lines) {
    const lineParts = line.split(':');
    const extractedValues = lineParts[1].substring(1).split(' ');
    parsedData.push({ result: lineParts[0], factors: extractedValues });
  }
  console.log(parsedData[parsedData.length - 1]);
}

parseOrderData();

for (const data of parsedData) {
  tree = [];
  for (let index = 0; index < data.factors.length; index++) {
    const factor = Number(data.factors[index]);
    const result = Number(data.result);
    if (index === 0) {
      tree.push(factor);
      continue;
    }
    let updatedTree = [];
    for (const branch of tree) {
      const sumValue = branch + factor;
      const multipliedValue = branch * factor;
      const concatenatedNumber = Number(branch.toString() + factor.toString());
      if (
        index === data.factors.length - 1 &&
        (sumValue === result ||
          multipliedValue === result ||
          concatenatedNumber === result)
      ) {
        sum += result;
        break;
      }
      if (sumValue <= result) {
        updatedTree.push(sumValue);
      }
      if (multipliedValue <= result) {
        updatedTree.push(multipliedValue);
      }
      if (concatenatedNumber <= result) {
        updatedTree.push(concatenatedNumber);
      }
    }
    tree = [...updatedTree];
  }
}

console.log(sum);

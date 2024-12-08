
import fs from 'fs';
console.clear()
type Equation = {
  answer: number;
  terms: number[];
  operators: string[];
}

const OperatorMap = new Map()
OperatorMap.set(0, '+')
OperatorMap.set(1, '*')

try {
  const input = fs.readFileSync(`${__dirname}/puzzle-input.txt`, 'utf-8')
  const tuples = input.split('\n').map(eq => eq.split(':'))


  // Build our Equations Object that we will need
  let equations: Array<Equation> = buildEquationsObject(tuples);

  const legitCalibrations: Array<number> = [];
  // Move through each equation, doing brute force on the strings, joining them and running them through eval
  for (let equation of equations ){
    // if(Number(equation.answer) !== 292){
    //   continue;
    // } else {
    //   console.log('Working on answer ', equation.answer)
    // }
    let binaryOperationString = equation.operators.map(op => '0').join('')
    const totalPossibleOperatorIterations = (2 ** equation.operators.length ) 

    let j = 0;
    while(j < totalPossibleOperatorIterations){
      // Do all the stuff.
      const operatorValues = binaryOperationString.split('').map(numeral => {
        return OperatorMap.get(Number(numeral))
      })
  
      // "Zip" together the two arrays.
      const zipArray: Array<(number|string)> = []
      for(let i = 0; i < equation.terms.length; i ++){
        const term = equation.terms[i]
        const operator = operatorValues[i]
        zipArray.push(term)
  
        // Operators have 1 less term so we only push that if 
        // we are NOT on the last numeric term.
        if(i !== equation.terms.length -1){
          zipArray.push(operator)
        }
      }
  
      const preEval = zipArray.join('')
      const postEval = evaluateLeftToRight(preEval)
      // console.log({
      //   // terms: equation.terms,
      //   // operators: equation.operators,
      //   binaryOperationString,
      //   operatorValues,
      //   // zipArray,
      //   preEval,
      //   postEval,
      //   answer: equation.answer
      // })
  
      if (Number(postEval) === Number(equation.answer) ){
        legitCalibrations.push(equation.answer)
        break; 
      }

      // increment binaryOperationString and counter.
      binaryOperationString = incrementBinary(binaryOperationString, 1)
      j++
    }
    

  }
  console.log(legitCalibrations)
  console.log(legitCalibrations.reduce((prev,curr) => prev+curr,0))
} catch (e:any){
  console.error(e)
}


function evaluateLeftToRight(expression: string): number {
  // Regular expression to match numbers and operators
  const tokens = expression.split(/([+*])/);

  // Initialize the result with the first number
  let result = parseInt(tokens[0], 10);

  // Iterate over the tokens and evaluate the expression left to right
  for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const number = parseInt(tokens[i + 1], 10);

      if (operator === '+') {
          result += number;
      } else if (operator === '*') {
          result *= number;
      }
  }

  return result;
}

function buildEquationsObject(tuples: string[][]) {
  let equations: Array<Equation> = [];
  for (let [answer, terms] of tuples) {
    const cleanTerms = terms.trim().split(/\s/).map(Number);
    const eq: Equation = {
      answer: Number(answer),
      terms: cleanTerms,
      operators: Array(cleanTerms.length - 1).fill(' ')
    };
    equations.push(eq);
  }
  return equations;
}

function incrementBinary(bits: string, iterations: number): string {
  // Convert the binary string to a number
  let number = parseInt(bits, 2);

  let binaryString = number.toString(2).padStart(bits.length, '0');
  for (let i = 0; i < iterations; i++) {
      // Increment the number
      number += 1;

      // Convert the number back to a binary string
      // Preserve leading zeros by using the same number of bits as the original
      binaryString = number.toString(2).padStart(bits.length, '0');
  }
  return binaryString
}

// Example usage:
// const binaryBits = '1011';  // Binary for 11
// const iterations = 5;
// incrementBinary(binaryBits, iterations);
// 
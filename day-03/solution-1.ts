import fs from 'fs'

const handleMultiplication = (stack: Array<string>) => {
  const unifiedString = stack.join('')
  const parts  = unifiedString.split(/[\(\)\,]/)
  const [operator, firstFactor, secondFactor, garbage]  = parts
  return Number(firstFactor) * Number(secondFactor)
}

try {
  // Read the File in 
  const file = fs.readFileSync(`${__dirname}/puzzle-input-3.txt`, 'utf-8')

  // Split every character.
  const chars = file.split('')

  // Now we move through the entire sequence building up our operations.
  // first and foremost the first symbol we are looking for is "mul"
  // then we need to see an open parenthesis, 1-3 digits, a comma (",") 1-3 digits
  // and then a closing parenthesis. If we see those unique values in order,
  // then we can run the math to multiply the two values, and store the result,
  // having cleared the stack. 

  // Repeat this process until there are no characters left.
  const numbers = [...'0123456789']
  const signalChars = ['m', 'u', 'l', '(', ',', ')', ...numbers]

  let signalStack: Array<string> = []
  let counter = 0;
  let accumulator = 0
  while (chars[counter] !== undefined){
    const currentChar = chars[counter]
    const lastSignal = signalStack[signalStack.length  - 1]

    if(signalStack.length === 0 && currentChar !== 'm'){
      counter++
      continue;
    }

    // First we reject anything we don't care about.
    if(!signalChars.includes(currentChar)) {
      counter+=1
      continue;
    }

    // Then we check on a case by case basis what to do with each character, making a decision to
    // either add it to the stack or not.
    if (currentChar === 'm' && chars[counter + 1] === 'u' && chars[counter + 2] === 'l' && signalStack.length === 0) {
      signalStack.push('mul')
      counter+=3
      continue;
    }

    if(currentChar === '(' && lastSignal === 'mul'){
      signalStack.push(currentChar)
      counter++
      continue;
    }

    if(currentChar === ',' && !isNaN(Number(lastSignal)) && !signalStack.includes(',')){
      signalStack.push(currentChar)
      counter++
      continue;
    }

    if(numbers.includes(currentChar) && [',','(', ...numbers].includes(lastSignal)){
      signalStack.push(currentChar)
      counter++;
      continue;
    }

    if(currentChar ===')' && !isNaN(Number(lastSignal))){
      signalStack.push(currentChar);
      const product = handleMultiplication(signalStack);
      accumulator+=product
      signalStack = []
      counter++
      continue;
    }

    counter++
  }

  console.log(accumulator)
} catch (e: any) {
  console.error(e)
}


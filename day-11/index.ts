import fs from 'fs';

type StonesList = Array<number>

try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  
  let stonesList: StonesList = input.split(/\s/).map(Number)
  console.log(stonesList)
  
  let blinkCount = 0;
  while(blinkCount <25){
    stonesList = blink(stonesList)
    console.log(`After ${blinkCount+1}`)
    console.log(stonesList)
    blinkCount++;
  }

  const numberOfStones = stonesList.length;
  console.log({
    stonesList,
    numberOfStones
  })
} catch (error) {
  console.error(error)
}

function blink(stonesList: StonesList): StonesList{
  const tempArray: StonesList = []

  // Move through each element and apply the rules.
  for(let i = 0; i < stonesList.length; i++){
    const stoneNumberAsString = `${stonesList[i]}`
    if(stonesList[i] === 0){
      tempArray.push(1)
    } else if(stoneNumberAsString.length % 2 === 0){
      const midpoint = stoneNumberAsString.length / 2
      const leftHalf = stoneNumberAsString.slice(0, midpoint)
      const rightHalf = stoneNumberAsString.slice(midpoint)
      tempArray.push(parseInt(leftHalf, 10))
      tempArray.push(parseInt(rightHalf, 10))
    } else {
      tempArray.push(stonesList[i] * 2024)
    }
  }
  return tempArray
}


function applyRulesGetNewNumber(stoneNumberAsString: string): number {
  const numberDigits = stoneNumberAsString.length;

  throw Error('not finished with applyRulesGetNewNumber')
  return 0
}

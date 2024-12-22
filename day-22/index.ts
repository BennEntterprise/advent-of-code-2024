import fs from 'fs'
import { mix } from './utils/mix'
import { prune } from './utils/prune'

try {
  const input = fs.readFileSync('./puzzle-input.txt', 'utf-8');
  const seeds =  input.split('\n').map(seed => parseInt(seed));

  // Turn the array of seeds into a map of seeds to secret number
  // who's initial value is the seed
  let seedMap = new Map<number, number>();
  seeds.forEach(seed => seedMap.set(seed, seed));

  let iteration = 0;
  while (iteration < 2000){
    seedMap = iterateSecretNumbers(seedMap)
    iteration++
  }

  let sum = 0;
  seedMap.forEach((secret: number) => {
    sum += secret
  })
  console.log(`Sum of all secrets: ${sum}`)

} catch (error) {
  console.error(error);
}


function iterateSecretNumbers(seedMap: Map<number,number>): Map<number, number>{
  let newSeedMap = new Map<number, number>();
  seedMap.forEach((oldSecret: number, seed: number) => {
    const mixConstituent1 = secretTransform1(oldSecret)
    let newSecret = mix(oldSecret, mixConstituent1)
    newSecret = prune(newSecret)


    const mixConstituent2 = secretTransform2(newSecret)
    const mix2 = mix(newSecret, mixConstituent2)
    newSecret = prune(mix2)

    const mixConstituent3 = secretTransform3(newSecret)
    const mix3 = mix(newSecret, mixConstituent3)
    newSecret = prune(mix3)
    
    // console.debug(`Seed: ${seed}, Old Secret: ${oldSecret}, New Secret: ${newSecret}`)
    newSeedMap.set(seed, newSecret)
  })
  return newSeedMap
}

function secretTransform1(secret: number): number{
  return secret * 64
}

function secretTransform2(secret: number): number{
  return Math.floor(secret / 32)
}

function secretTransform3(secret: number): number{
  return secret * 2048
}


import fs from 'fs'
import { splitToConstituentSizes } from './utils/splitToConstituentSizes'
import { createDiskMapBlocks } from './utils/createDiskMapBlocks'

export type NumberArray = Array<number>
export type DotArray = Array<'.'>
export type DiskMapBlocks = Array<number | '.'>

try {
  // Get the Disk Map String
  const diskMapString = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf-8')
  console.log('diskMapString', diskMapString)
  /**
   *  Important Concepts
   * 
   * disk map is a dense representation of files, and free space.
   * Each digit alternates between file and size and free space size. 
   * The files each have an ID corresponding to their order pre-rearrangement
   * AXIOM: All EVEN numbered indexes (incl 0) are fileSizes
   * AXIOM: All ODD numbered indices are free-space sizes
   * AXIOM: Each fileId, is it's order in the Even Numbered indices.
   * 
   * Checksum: Once updated, multiply each blocks' position with it's fileId Number
   * */ 

  // Split the diskMapString into constituents: files and freeSpaces
  const [fileSizes, freeSpaceSizes]  = splitToConstituentSizes(diskMapString)
  
  // Create the diskMapBlocks
  const diskMapBlocks = createDiskMapBlocks(fileSizes, freeSpaceSizes)
  
  console.log({
    fileSizes,
    freeSpaceSizes,
    diskMapBlocks: diskMapBlocks.join('')
  })

  // Reshape the memory
  const cleanedMemory = reshapeMemoryRightToLeft(diskMapBlocks)
  console.log({
    cleanedMemory: cleanedMemory.join('')
  })

  // Calculate checksum

} catch (e: any) {
  console.error(e)
}


/**
 * @param diskMapBlocks 
 * @returns 
 */
function calculateCheckSum(diskMapBlocks: Array<string|number>){
  const sum = diskMapBlocks.reduce((previousValue: string|number, currentValue: string|number, currentIndex: number, array: (string|number)[]) => {
    console.log(previousValue, currentValue, currentIndex, array)
    throw Error('CalculateCheckSum needs implementation')
    return 0
  }, 0)

  let intSum : number;
  try {
    intSum =parseInt(sum as string) as number
  } catch (e) {
    throw Error('Error parsing checksum string --> number')
  }
  return sum;
}

/**
 * @description a function to move all '.' to the right and all numbers to the left by swapping the first '.' found in the left with the first numeral found on the right and so on, utilizs the memoryShapingComplete to know when to stop
 * @param diskMapBlocks 
 * @returns 
 */
function reshapeMemoryRightToLeft( diskMapBlocks: DiskMapBlocks): DiskMapBlocks{
  console.log('Reshaping memory...')
  let reshapedMemory = diskMapBlocks;
  let reshapedMemoryComplete = memoryShapingComplete(reshapedMemory)
  let reshapingCounter = 0;
  while(reshapingCounter < diskMapBlocks.length){
    // Find the first '.' from the left and the first number from the right
    let leftIndex = reshapedMemory.findIndex((block) => block === '.')
    let fakeRightIndex = reshapedMemory.slice().reverse().findIndex((block) => block !== '.') 
    let actualRightIndex = reshapedMemory.length - fakeRightIndex - 1

    // Swap the two values
    if(leftIndex !== -1 && actualRightIndex !== -1){
      let temp = reshapedMemory[leftIndex]
      reshapedMemory[leftIndex] = reshapedMemory[actualRightIndex]
      reshapedMemory[actualRightIndex] = temp
    }
    reshapedMemoryComplete = memoryShapingComplete(reshapedMemory)
    reshapingCounter++
    // console.log({
    //   reshapedMemory: reshapedMemory.join(''),
    //   reshapedMemoryComplete
    // })
  }
  console.log('Reshaping complete')
  return reshapedMemory
}

function memoryShapingComplete(diskMapBlocks: DiskMapBlocks):boolean{
  // Consume the map from both sides pushing the items into stacks,
  // The left stack should always contain numbers, if not return false
  // The right stack should always contain '.', if not return false.
  // If you can continue such that left.length + right.length === diskMapBlocks.length, then return true.

  const leftStack: number[] = []
  const rightStack: string[] = []

  // Check to make sure the current characters can be pushed in...
  for(let i = 0; i < diskMapBlocks.length; i++){
    if(typeof diskMapBlocks[i] === 'number'){
      leftStack.push(diskMapBlocks[i] as number)
      continue
    } else {
      break;
    }
  }
  
  for(let j = diskMapBlocks.length -1; j >= 0; j --){
    if(diskMapBlocks[j] === '.'){
      rightStack.unshift(diskMapBlocks[j] as string)
      continue;
    } else {
      break
    }
  }

  // Update the Exhausted Map flag
  // console.log({
  //   leftStack: leftStack.join('' ),
  //   rightStack: rightStack.join('')
  // })

  if(
    leftStack.length + rightStack.length === diskMapBlocks.length
  ){
    return true;
  }else {
    return false
  }
}
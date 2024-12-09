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
  console.log({
    fileSizes,
    freeSpaceSizes
  })

  // Create the diskMapBlocks
  const diskMapBlocks = createDiskMapBlocks(fileSizes, freeSpaceSizes)
  console.log('diskMapBlocks', diskMapBlocks.join(''))

  // Reshape the memory

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


function reshapeMemoryRightToLeft( diskMapBlocks: Array<string>): Array<string>{
  // How to do this recursively until only ..... are on the right?
  let dmb = diskMapBlocks
  while(!memoryShapingComplete(dmb)){
    // Do some shaping
    throw Error('Need memory shaping logic in reshapeMemoryRightToLeft')
  }
  throw Error('ReshapeMemoryRightToLeft needs implementation')
  return dmb
}

function memoryShapingComplete(diskMapBlocks: Array<any>):boolean{
  // Consume the map from both sides pushing the items into stacks,
  // The left stack should always contain numbers, if not return false
  // The right stack should always contain '.', if not return false.
  // If you can continue such that left.length + right.length === diskMapBlocks.length, then return true.
  const leftStack: number[] = []
  const rightStack: string[] = []
  let exhaustedMap = leftStack.length + rightStack.length === diskMapBlocks.length

  while(!exhaustedMap){
    // Check to make sure the current characters can be pushed in...
    throw Error('memoryShapingComplete needs implementation')
    // Update the Exhausted Map flag
    exhaustedMap = leftStack.length + rightStack.length === diskMapBlocks.length
  }

  return false;
}
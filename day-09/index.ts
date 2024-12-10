import fs from 'fs'
import { splitToConstituentSizes } from './utils/splitToConstituentSizes'
import { createDiskMapBlocks } from './utils/createDiskMapBlocks'
import { reshapeMemoryRightToLeft } from './utils/reshapeMemoryRightToLeft'
import { calculateCheckSum } from './utils/calculateCheckSum'

export type NumberArray = Array<number>
export type DotArray = Array<'.'>
export type DiskMapBlocks = Array<number | '.'>

try {
  // Get the Disk Map String
  const diskMapString = fs.readFileSync(`${__dirname}/puzzle-input.txt`, 'utf-8')
  // console.log('diskMapString', diskMapString)
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
  
  // console.log({
  //   fileSizes,
  //   freeSpaceSizes,
  //   diskMapBlocks: diskMapBlocks.join('')
  // })

  // Reshape the memory
  const cleanedMemory = reshapeMemoryRightToLeft(diskMapBlocks)
  // console.log({
  //   cleanedMemory: cleanedMemory.join('')
  // })

  // Calculate checksum
  const checkSum = calculateCheckSum(cleanedMemory)
  console.log({
    checkSum
  })

} catch (e: any) {
  console.error(e)
}




import { DiskMapBlocks } from "..";
import { memoryShapingComplete } from "./memoryShapingComplete";

/**
 * @description a function to move all '.' to the right and all numbers to the left by swapping the first '.' found in the left with the first numeral found on the right and so on, utilizs the memoryShapingComplete to know when to stop
 * @param diskMapBlocks
 * @returns
 */
export function reshapeMemoryRightToLeft(diskMapBlocks: DiskMapBlocks): DiskMapBlocks {
  console.log('Reshaping memory...');
  let reshapedMemory = diskMapBlocks;
  let reshapedMemoryComplete = memoryShapingComplete(reshapedMemory);
  let reshapingCounter = 0;
  while (reshapingCounter < diskMapBlocks.length) {
    // Find the first '.' from the left and the first number from the right
    let leftIndex = reshapedMemory.findIndex((block) => block === '.');
    let fakeRightIndex = reshapedMemory.slice().reverse().findIndex((block) => block !== '.');
    let actualRightIndex = reshapedMemory.length - fakeRightIndex - 1;

    // Swap the two values
    if (leftIndex !== -1 && actualRightIndex !== -1) {
      let temp = reshapedMemory[leftIndex];
      reshapedMemory[leftIndex] = reshapedMemory[actualRightIndex];
      reshapedMemory[actualRightIndex] = temp;
    }
    reshapedMemoryComplete = memoryShapingComplete(reshapedMemory);
    reshapingCounter++;
    // console.log({
    //   reshapedMemory: reshapedMemory.join(''),
    //   reshapedMemoryComplete
    // })
  }
  console.log('Reshaping complete');
  return reshapedMemory;
}

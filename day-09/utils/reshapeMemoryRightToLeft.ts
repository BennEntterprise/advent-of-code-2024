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
  let leftIndex = 0;
  let rightIndex = reshapedMemory.length - 1;

  while (leftIndex < rightIndex) {
    // Find the first '.' from the left
    while (leftIndex < reshapedMemory.length && reshapedMemory[leftIndex] !== '.') {
      leftIndex++;
    }

    // Find the first number from the right
    while (rightIndex >= 0 && reshapedMemory[rightIndex] === '.') {
      rightIndex--;
    }

    // Swap the two values if valid indices are found
    if (leftIndex < rightIndex) {
      let temp = reshapedMemory[leftIndex];
      reshapedMemory[leftIndex] = reshapedMemory[rightIndex];
      reshapedMemory[rightIndex] = temp;
      leftIndex++;
      rightIndex--;
    }
  }

  console.log('Reshaping complete');
  return reshapedMemory;
}
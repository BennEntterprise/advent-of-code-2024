import { DiskMapBlocks } from "..";

/**
 * @param diskMapBlocks
 * @returns
 */
export function calculateCheckSum(diskMapBlocks: DiskMapBlocks): number {
  const sum: number = diskMapBlocks.reduce((previousValue: any, currentValue: any, currentIndex: number, array: DiskMapBlocks) => {
    console.log(previousValue, currentValue, currentIndex, array);
    if (typeof currentValue === 'number') {
      return previousValue + (currentValue * currentIndex);
    }
    return previousValue;
  }, 0);

  return sum;
}

import { NumberArray } from "..";

/**
 * @description an array to split a disk map string into file blocks and empty block arrays
 * @param diskMapString
 * @returns
 */
export function splitToConstituentSizes(diskMapString: string): [NumberArray, NumberArray] {
  const filesSizes: NumberArray = [];
  const emptySpaceSizes: NumberArray = [];
  const diskMapArray = diskMapString.split('');

  for (let i = 0; i < diskMapArray.length; i++) {
    if (i % 2 == 0) {
      filesSizes.push(Number(diskMapArray[i]));
    } else {
      emptySpaceSizes.push(Number(diskMapArray[i]));
    }
  }
  return [filesSizes, emptySpaceSizes];
}

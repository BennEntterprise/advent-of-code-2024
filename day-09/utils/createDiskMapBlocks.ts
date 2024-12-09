import { NumberArray, DiskMapBlocks, DotArray } from "..";

/**
 * @description Convert file sizes and empty space sizes to a disk map of blocks.
 * @param fileSizes
 * @param emptySpaceSizes
 * @returns
 */
export function createDiskMapBlocks(fileSizes: NumberArray, emptySpaceSizes: NumberArray): DiskMapBlocks {
  let i = 0;
  let diskMapBlock: DiskMapBlocks = [];
  while (i < fileSizes.length) {
    // Get the FileId/Size
    const fileId = i;
    const fileSize = fileSizes[i];
    const fileSpaces: NumberArray = Array(fileSize).fill(fileId);

    // Get the Following Empty space Size (but only if we aren't on the last element)
    let emptySpaces: DotArray = [];
    if (i !== fileSizes.length - 1) {
      emptySpaces = Array(emptySpaceSizes[i]).fill('.');
    }
    diskMapBlock.push(...fileSpaces);
    if (emptySpaces.length !== 0) {
      diskMapBlock.push(...emptySpaces);
    }

    // Increment Counter
    i++;
  }
  return diskMapBlock;
}

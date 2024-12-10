import { DiskMapBlocks } from "..";

export function memoryShapingComplete(diskMapBlocks: DiskMapBlocks): boolean {
  let seenDot = false;

  for (let i = 0; i < diskMapBlocks.length; i++) {
    if (typeof diskMapBlocks[i] === 'number') {
      if (seenDot) {
        return false;
      }
    } else if (diskMapBlocks[i] === '.') {
      seenDot = true;
    }
  }

  return true;
}

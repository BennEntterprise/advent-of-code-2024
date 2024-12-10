import { DiskMapBlocks } from "..";

export function memoryShapingComplete(diskMapBlocks: DiskMapBlocks): boolean {
  // Consume the map from both sides pushing the items into stacks,
  // The left stack should always contain numbers, if not return false
  // The right stack should always contain '.', if not return false.
  // If you can continue such that left.length + right.length === diskMapBlocks.length, then return true.
  const leftStack: number[] = [];
  const rightStack: string[] = [];

  // Check to make sure the current characters can be pushed in...
  for (let i = 0; i < diskMapBlocks.length; i++) {
    if (typeof diskMapBlocks[i] === 'number') {
      leftStack.push(diskMapBlocks[i] as number);
      continue;
    } else {
      break;
    }
  }

  for (let j = diskMapBlocks.length - 1; j >= 0; j--) {
    if (diskMapBlocks[j] === '.') {
      rightStack.unshift(diskMapBlocks[j] as string);
      continue;
    } else {
      break;
    }
  }

  // Update the Exhausted Map flag
  // console.log({
  //   leftStack: leftStack.join('' ),
  //   rightStack: rightStack.join('')
  // })
  if (leftStack.length + rightStack.length === diskMapBlocks.length) {
    return true;
  } else {
    return false;
  }
}

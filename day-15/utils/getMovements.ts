import { movements } from "../types";
import type { Direction } from "../types";

export function getMovements(directionsText: string): Array<[number, number]> {
  const dSplit = directionsText.split('\n').map(direction => direction.split(''));
  const directionStrings = dSplit.flat();
  const movementsArray = directionStrings.map(direction => movements[direction as Direction]);

  return movementsArray;
}

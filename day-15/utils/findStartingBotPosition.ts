import type { BotPosition } from '../types';

/**
 * @description Find the starting position of the bot marked as an "@"
 * @param grid
 * @returns
 */
export function findBotPosition(grid: string[][]): BotPosition {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === '@') {
        return [i, j];
      }
    }
  }
  throw new Error('Bot position not found');
}

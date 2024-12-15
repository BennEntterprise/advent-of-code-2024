import { Grid, GPSResult } from "../types";

export function calculateGPS(grid: Grid) {
  const gpsResults: GPSResult[] = [];
  // Loop through the grid and calculate the GPS of each box.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const box = grid[y][x];
      if (box === 'O') {
        gpsResults.push({ x, y, gps: (x * 100) + 4 });
      }
    }
  }

  return gpsResults;
}

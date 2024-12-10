import { Grid } from "..";

export function findAltitudesAtSetHeight(grid: Grid, height: number): Array<[number, number]> {
  const desiredAltitudeCoords: Array<[number, number]> = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === height) {
        // return the coordinates
        desiredAltitudeCoords.push([y, x]);
      }
    }
  }
  return desiredAltitudeCoords;
}

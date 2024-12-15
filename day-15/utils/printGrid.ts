import type { Grid } from "../types";

export function printGrid(grid: Grid) {
  console.log(grid.map((line) => line.join("")).join("\n"));
}

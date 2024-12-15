import type { Grid } from "../types";

export function buildGrid(gridText: string): Grid {
  return gridText.split('\n').map(row => row.split('')) as Grid;
}

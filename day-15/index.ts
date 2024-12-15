import { directionSet } from "./../day-06/lib/types";
import fs from "fs";
import { findBotPosition } from "./utils/findStartingBotPosition";
import { calculateGPS } from "./utils/calculateGPS";
import type {
  BotPosition,
  Direction,
  GPSResult,
  Grid,
  Movements,
} from "./types";
import { getMovements } from "./utils/getMovements";
import { buildGrid } from "./utils/buildGrid";
import { printGrid } from "./utils/printGrid";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    const input = fs.readFileSync(`${__dirname}/sample-input.txt`, "utf8");
    const [gridText, directionsText] = input.split("\n\n");

    // Parse the inputs to usable grid and movements
    let grid = buildGrid(gridText);
    let movementsArray = getMovements(directionsText);
    let botPosition = findBotPosition(grid);

    // Make all the bot movements
    for (let i = 0; i < movementsArray.length; i++) {
      console.clear()
      console.log(i);
      // Calculate the new gird based on the bot position, it's next movement and the grid
      const [newGrid, newPosition] = calculateMovement(
        grid,
        botPosition,
        movementsArray[i]
      );
      grid = newGrid;
      botPosition = newPosition;
      printGrid(grid);
      await sleep(1000);
    }

    // Calculate the GPS of each box
    const gpsResults: GPSResult[] = calculateGPS(grid);
    // Calculate Sum of all GPS
    const sumOfGPS = Object.values(gpsResults).reduce(
      (acc: number, curr: GPSResult) => {
        return acc + curr.gps;
      },
      0
    );
  } catch (error) {
    console.error(error);
  }
})();

function calculateMovement(
  grid: Grid,
  botPosition: BotPosition,
  movement: [number, number]
): [Grid, BotPosition] {
  // Using the bot's position and the movement, calculate the new position
  // if there is a box in the new position, recursively check the next
  // position in the SAME direction. If that nth position is empty, move the box;
  // if the nth position is a wall, do nothing. If the nth position is a box, recursively
  // check the next position in the SAME direction.
  // Once hitting a "wall" return the coordinate we had to STOP at so that we can
  // update the grid with the new position of box(es) and the bot's new position

  return [grid, botPosition];
}


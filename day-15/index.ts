import { directionSet } from './../day-06/lib/types';
import fs from 'fs';
import { findBotPosition } from './utils/findStartingBotPosition';
import { calculateGPS } from './utils/calculateGPS';
import type { BotPosition, Direction, GPSResult, Grid, Movements } from './types';
import { getMovements } from './utils/getMovements';
import { buildGrid } from './utils/buildGrid';


try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  
  const [gridText, directionsText] = input.split('\n\n');

  // Parse the inputs to usable grid and movements
  let grid = buildGrid(gridText);
  let movementsArray = getMovements(directionsText)
  let botPosition =  findBotPosition(grid);

  // Make all the bot movements
  for( let movement of movementsArray) {
    // Calculate the new gird based on the bot position, it's next movement and the grid
    const [newGrid, newPosition] = calculateMovement(grid, botPosition, movement);
    grid = newGrid;
    botPosition = newPosition;
  }

  // Calculate the GPS of each box
  const gpsResults: GPSResult[] = calculateGPS(grid)

  // Calculate Sum of all GPS
  const sumOfGPS = Object.values(gpsResults).reduce((acc: number, curr: GPSResult) => {
    return acc + curr.gps
  },0)


} catch (error) {
  console.error(error)
}


function calculateMovement(grid: Grid, botPosition: BotPosition, movement: [number, number]): [Grid, BotPosition] {


  return [grid,botPosition]
}




import fs from 'fs';
import { getStartingPositions } from './utils/getStartingPositions'
import { advanceRobots } from './utils/advanceRobots'

import type { Robot as RobotType } from './types'
import Robot from './Robot'
import { drawRobots } from './utils/drawRobots'

// https://adventofcode.com/2024/day/14

const mapSize = {
  x: 11,
  y: 7
}
const room = Array.from({ length: mapSize.y }, () => Array(mapSize.x).fill('.'));

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  

  let robots = getStartingPositions(input);

  let seconds = 0;
  while(seconds <100){
    // Advance robots
    console.clear()
    robots = advanceRobots(robots, room)
    drawRobots(robots, room)
    console.log(seconds)
    seconds++
    await sleep(50)
  }
} catch (error) {
  console.error(error)
}
})()





function calculateWrapAround(){

}



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
    // drawRobots(robots, room)
    console.log(seconds)
    seconds++
    await sleep(1)
  }

  // Split room into quadrants
  const xAxis = Math.floor(room.length / 2)
  const yAxis = Math.floor(room[0].length /2)

  const results = getQuadrantCounts(robots, xAxis,yAxis)
  const multiplicativeResult = Object.values(results).reduce((acc, value) => {
    return acc*=value
  })
  console.log({
    results,
    multiplicativeResult,
    xAxis,
    yAxis
  })
} catch (error) {
  console.error(error)
}
})()


function getQuadrantCounts(robots: Robot[], xAxis: number, yAxis: number){
  const quadrantCount = {
    'I': 0,
    'II': 0,
    'III': 0,
    'IV': 0
  }
  robots.forEach((robot) => {
    if(
      robot.position.y === xAxis
      || robot.position.x === yAxis
    ){
      // Do nothing! This point is on an axis
      return 
    }

    if(robot.position.y > xAxis){
      // Either Quadrant 3 or 4
      if(robot.position.x < yAxis){
        quadrantCount.III+=1
      } else {
        quadrantCount.IV+=1
      }
    } else if(robot.position.y < xAxis) {
      // Either Quadrant 1 or 2
      if(robot.position.x < yAxis){
        quadrantCount.II+=1
      } else {
        quadrantCount.I+=1
      }
    } else {
      throw Error('Should never happen.')
    }
  })
  return quadrantCount
}

import Robot from "../Robot"

/**
 * @description a function which takes an array of robots and advances them 
 * dependent on their position + velocity. NOTE: This function employs modulus
 * operation to ensure that the robots "wrap" around the map.
 * @param robots 
 * @returns 
 */
export function advanceRobots(robots: Robot[], grid: Array<Array<any>>){
  return robots.map((robot) => {

    const {position: {x: px, y: py}, velocity: {x: vx, y: vy}}  = robot

    const [ nextYPos, nextXPos,] = [
      py + vy,
      px + vx,
    ]

    const [moxXPos, modYPos] = [
      (nextXPos % grid[0].length) < 0 ? (nextXPos % grid[0].length) + grid[0].length :nextXPos % grid[0].length ,
      (nextYPos % grid.length) < 0 ? (nextYPos % grid.length) + grid.length : nextYPos % grid.length
    ]

    robot.position.x = moxXPos
    robot.position.y = modYPos
    return robot
  })
}
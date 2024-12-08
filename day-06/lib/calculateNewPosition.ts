import changeOrientation from "./changeOrientation";
import { Area, GuardLocation, movementDirectives, Orientation } from "./types";

/**
 * @description This will return what should be the next location of the guard. 
 * It does NOT move the guard, it simply provides the next position which can 
 * include a rotation. This function will ONLY return NULL, if the next position
 * will move the guard off the map.
 * @param area 
 * @param guardPosition 
 * @returns {GuardLocation | null}
 */
function calculateNewPosition(area: Area,guardPosition: GuardLocation): GuardLocation | null {
  let nextPosition: GuardLocation | null = null;
  let newOrientation: Orientation;

  if(guardPosition.orientation === null
    || guardPosition?.position?.y === null
    || guardPosition?.position?.x === null
   ){
    // If somehow the guard's position is null, we pollute and
    // return null because we can't do math on nulls.
    return null
  }

  const velocity = movementDirectives[guardPosition.orientation]
  const nextY = guardPosition!.position!.y + velocity.y
  const nextX =  guardPosition!.position!.x + velocity.x

  if (area[nextY] === undefined || area[nextY][nextX] === undefined){
    return null;
  }

  const nextLocation = area[nextY][nextX]
  console.log('nextLocationValue',nextLocation)
  if(nextLocation === '#'){
    // Handle our Rotation
    newOrientation = changeOrientation(guardPosition.orientation)
    nextPosition = {
      position : {
        x: guardPosition!.position!.x,
        y: guardPosition!.position!.y
      }, 
      orientation: newOrientation
    }
    console.log(nextPosition)
    return nextPosition
  } else {
    // Calculate a movement
    nextPosition = {
      position:{
        x: nextX,
        y: nextY,
      },
      orientation: guardPosition.orientation
    }
    console.log(nextPosition)
    return nextPosition
  }
  throw Error('Unexpected new position calculation',)

  // Interrogate if this can be moved to or not
  // '#' requires a change in direction
  // '.' or 'X'  means a move forward can occur
  // 'undefined' represents an exit is about to occur so we return null.
}

export default calculateNewPosition
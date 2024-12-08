import { Area, Position } from "./types"

/**
 * @description an interrogator to decide if the next position is BLOCKED by a "#" obstruction
 * @param area 
 * @param nextPosition 
 * @returns 
 */
function nextPositionBlocked(area: Area, nextPosition: Position): boolean {
  const nextObject = area[nextPosition.y][nextPosition.x]
  if(nextObject === '.'){
    return false
  } else if(nextObject == undefined  )
    return false
  else {
    return true
  }
}
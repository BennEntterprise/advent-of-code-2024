import { GuardLocation, movementDirectives, Position } from "./types"

/**
 * @description 
 * @param guardLocation 
 * @returns 
 */
function getNewPosition(guardLocation: GuardLocation): GuardLocation | null{
  // Get the Array for movement
  if(guardLocation.orientation === null) {
    return null
  }
 
  // Get new Coordinate
  const movementDirective = movementDirectives[guardLocation.orientation ]
  const newCoords: Position = {
    x: guardLocation?.position?.x! + movementDirective.x,
    y: guardLocation?.position?.y! + movementDirective.y
  }
  return {
    position: newCoords,
    orientation: guardLocation.orientation
  }
}


export default getNewPosition
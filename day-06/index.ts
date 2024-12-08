import fs from 'fs'
import { Area, GuardLocation, movementDirectives, Orientation, Position } from './lib/types'
import isValidDirection from './lib/isValidDirection'
import calculateNewPosition from './lib/calculateNewPosition'
import isEqual from './lib/isEqual'
import getNewPosition from './lib/getNewPosition'

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    const input = fs.readFileSync(`${__dirname}/real-puzzle-input.txt`, 'utf-8')
    const area: Area = input.split('\n').map(line => line.split(''))
    
    // Find Starting Position of Guard
    let currentGuardLocation: GuardLocation | null = null
    let found = false;
    let [y, x] = [0, 0];
    while(y < area.length && !found){
      x = 0;
      while(x < area[y].length && !found){
        if(isValidDirection(area[y][x])){
          const orientation: Orientation = area[y][x] as Orientation
          const position: Position = { x, y  }
          found = true
          currentGuardLocation = {
            position,
            orientation
          } as GuardLocation;
          console.log('Found Guard', currentGuardLocation)
          break;
        }
        x++
      }
      y++
    }
    if(currentGuardLocation === null){
      throw Error(`Guard wasn't found!`)
    }
  
    // Watch the guard move through the map.
    let guardExited = false
    let visitedLocationCount = 0;
    let steps = 0; //Useful for Debugging
    while(!guardExited){
      let nextGuardLocation = calculateNewPosition(area, currentGuardLocation as GuardLocation)

      if (nextGuardLocation === null) {
        guardExited = true;
      }
      if(currentGuardLocation === null) {
        break;
      }
  
      if(isEqual(nextGuardLocation?.position, currentGuardLocation?.position)){
        console.log('ARE EQUAL')
      } else {
        nextGuardLocation = getNewPosition(currentGuardLocation)
      }
      steps++

      // console.log(area.map(line => line.join('')).join('\n'))
      
      // Since we just left the post, mark the previous location as visited.
      if(area[currentGuardLocation!.position!.y][currentGuardLocation!.position!.x] !== "X"){
        area[currentGuardLocation!.position!.y][currentGuardLocation!.position!.x] = "X"
        visitedLocationCount++;
      }
      currentGuardLocation = nextGuardLocation
    }
    console.log(`Guard Exited, total spots visited: ${visitedLocationCount}, total steps: ${steps}`)
  } catch (e: any) {
    console.error(e)
  }
})();


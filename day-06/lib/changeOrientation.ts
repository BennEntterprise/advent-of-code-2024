import { Orientation } from "./types";

function changeOrientation(currentDirection: Orientation): Orientation {
  let newDirection: Orientation;
  switch(currentDirection) {
    case "^":
      newDirection = '>'
      break;
    case '>':
      newDirection = 'V'
      break;
    case 'V':
      newDirection = '<'
      break;
    case '<': 
      newDirection = '^'
      break;
    default:
      const error = new Error(`Exhaustive Check Reached, must add new switch handler to "changeDirection"`)
      throw error
  }
  return newDirection
}

export default changeOrientation
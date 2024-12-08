import { directionSet, Orientation } from "./types"

function isValidDirection(char: string): char is Orientation {
  return directionSet.has(char)
}

export default isValidDirection
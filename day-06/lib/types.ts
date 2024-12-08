export type Orientation = '^' | '>' | '<' | 'V'
export type Position = {x: number, y: number}
export type Area = Array<Array<string>>
export const directionSet: Set<string> = new Set(['^', '>', '<', 'V'])

export type GuardLocation = {
  position: Position | null
  orientation: Orientation | null
}

// Using the current position, calculate the next position
export const movementDirectives: Record<Orientation, Position> = {
  '^': {y: -1,x: 0},
  '>': {y: 0, x:1 },
  '<': {y: 0, x: -1},
  'V': {y: 1,x: 0}
}
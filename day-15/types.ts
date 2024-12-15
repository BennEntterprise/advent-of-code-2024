export type BotPosition = [number, number];
export type GridValues = '.' | '#' | 'O' | '@';
export type GPSResult = {
  x: number,
  y: number,
  gps: number
}

export type Grid = Array<Array<GridValues>>;

export type Movements = {
  '^': [number, number],
  '<': [number, number],
  '>': [number, number],
  'v': [number, number],
}

export type Direction = keyof Movements;



export const movements: Record<Direction, [number, number]> = {
  '^': [-1, 0],
  'v': [1, 0],
  '<': [0, -1],
  '>': [0, 1]
}
import fs from 'fs'
import { findAltitudesAtSetHeight } from './utils/findAltitudesAtSetHeight'
import { getTrailHeadScore } from './utils/getTrailScore'

export type Grid = Array<Array<number>>

try {
  const input = fs.readFileSync(`${__dirname}/puzzle-input.txt`, 'utf-8')
  const grid: Grid = input.split('\n').map(row => row.split('').map(n => parseInt(n)))


  // Gather All of our starting points.
  const trailHeads = findAltitudesAtSetHeight(grid, 0)
  console.log(trailHeads)

  let totalParkScore = 0
  for(let trailheadCoords of trailHeads) {
    const [y, x] = trailheadCoords

    const trailScore = getTrailHeadScore(grid, trailheadCoords)

    totalParkScore += trailScore
  }

  console.log({totalParkScore})
} catch (e: any) {
  console.error(e)
}




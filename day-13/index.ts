import fs from 'fs';
import { parseGames } from './utils/parseGames';

export type Game = {
  gameId: number,
  buttons: {
    a: {
      x: number,
      y: number,
    },
    b: {
      x: number,
      y: number
    },
    prizeLocation: {
      x: number,
      y: number
    }
  }
}


try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  

  const gameBlobs = input.split('\n\n')
  
  const gameSpecs = gameBlobs.map(gb => gb.split('\n'))

  // Massage the game specs into objects we can work with.
  const games = parseGames(gameSpecs)
 

} catch (error) {
  console.error(error)
}


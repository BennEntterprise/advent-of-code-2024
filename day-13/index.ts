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

type GameResult = {
  wonPrize: boolean,
  a: number,
  b: number
}

const consts = {
  a: 3,
  b: 1
}


try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  

  const gameBlobs = input.split('\n\n')
  
  const gameSpecs = gameBlobs.map(gb => gb.split('\n'))

  // Massage the game specs into objects we can work with.
  const games = parseGames(gameSpecs)
 
  console.log(tryToWinPrize(games[0]))

} catch (error) {
  console.error(error)
}


function tryToWinPrize(game:Game){
  const wonPrize = false;
  // /https://www.npmjs.com/package/linear-algebra
  // Need to find a solution
  // Button A: X+94, Y+34
  // Button B: X+22, Y+67
  // Prize: X=8400, Y=5400

  // TODA! Linear Algebra
  // na(ax) + nb(bx) = 8400
  // na(ay) + nb(by) = 5400

  // 

  return {
    wonPrize
  }
}

import { Game } from '../types'

// Setup Linear Algebra Package
const mathjs = require("mathjs");
export function tryToWinPrize(game: Game) {
  const wonPrize = false;
  // /https://www.npmjs.com/package/linear-algebrag
  // Need to find a solution
  // Button A: X+94, Y+34
  // Button B: X+22, Y+67
  // Prize: X=8400, Y=5400

  // TODA! Linear Algebra
  // na(ax) + nb(bx) = 8400
  // na(ay) + nb(by) = 5400
  // Define the matrix of coefficients\
  const A = [
    [game.buttons.a.x, game.buttons.b.x],
    [game.buttons.a.y, game.buttons.b.y],
  ];

  // Define the vector for the prize location
  const B = [game.prizeLocation.x, game.prizeLocation.y];

  const determinant = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if(determinant === 0 ){
    console.log(`Game: ${game.gameId} is singular, cannot be solved`)
    return {
      wonPrize,
      na: null,
      nb: null
    }
  }

  try {
    const solution = mathjs.lusolve(A, B);

    // Extract Presses from solution
    const na = solution[0][0];
    const nb = solution[1][0];
  
    return {
      wonPrize: true,
      na: Math.round(na),
      nb: Math.round(nb),
    };
  } catch(e: any){
    console.error('An error occured while solving the system')
    return {
      wonPrize,
      na: null,
      nb: null
    }
  }
}

import { Game, GameResult } from '../types'

// Setup Linear Algebra Package
const mathjs = require("mathjs");

const costs = {
  a: 3,
  b: 1,
};

const has100Limit = !process.env.PART2

export function tryToWinPrize(game: Game): GameResult {
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
      wonPrize: false
    }
  }

  try {
    const solution = mathjs.lusolve(A, B);

    // Extract Presses from solution
    const na = Math.round(solution[0][0]);
    const nb = Math.round(solution[1][0]);


    if(
      (na > 100 || nb > 100)
      && has100Limit
    )
    {
      console.info(`Game ${game.gameId} was more than 100 presses. A: ${na}; B: ${nb}`)
      return {
        wonPrize: false,
        na,
        nb
      }
    }

    // Double check the solution (since we round we want to be 
    // sure that it's a "valid" rounding only fixing minor errors
    // JS floating point math and not a significant roundings due
    // to na,nb being legitimate decimals which would indicate
    // there is not a whole number of button presses.)
    const calculatedX = na * game.buttons.a.x + nb * game.buttons.b.x;
    const calculatedY = na * game.buttons.a.y + nb * game.buttons.b.y;

    if (
      Math.abs(calculatedX - game.prizeLocation.x) > 1 
      || Math.abs(calculatedY - game.prizeLocation.y) > 1
    ) {
      console.info(`Game ${game.gameId} solution was invalid after rounding. Calculated X: ${calculatedX}, Y: ${calculatedY}`);
      return {
      wonPrize: false,
      na,
      nb
      };
    }

    // Rule Out Negative Values
    if (na < 0 || nb < 0) {
      console.info(`Game ${game.gameId} solution had negative values. na: ${na}, nb: ${nb}`);
      return {
      wonPrize: false,
      na,
      nb
      };
    }

    const aButtonCosts = na * costs.a;
    const bButtonCosts = nb * costs.b;
  
    return {
      wonPrize: true,
      na: Math.round(na),
      nb: Math.round(nb),
      aButtonCosts,
      bButtonCosts,
      totalCost: aButtonCosts + bButtonCosts
    };
  } catch(e: any){
    console.error('An error occured while solving the system')
    return {
     wonPrize: false
    }
  }
}

import fs from "fs";
import { parseGames } from "./utils/parseGames";
import { tryToWinPrize } from './utils/tryToWinPrize'
import type { GameResult } from "./types";

try {
  console.log(process.env.PART_2)
  const input = fs.readFileSync(`${__dirname}/puzzle-input.txt`, "utf8");

  const gameBlobs = input.split("\n\n");

  const gameSpecs = gameBlobs.map((gb) => gb.split("\n"));

  // Massage the game specs into objects we can work with.
  const games = parseGames(gameSpecs);

  const results: GameResult[] = []
  for(let game of games){
    const result = tryToWinPrize(game);
    // console.log(result)
    results.push(result)
  }

  // For each result, if it's a winner, add to the total cost
  const totalCost: number = results.reduce((acc, currValue, currentIndex, entireArray ) => {
    if(currValue.wonPrize && currValue.wonPrize){
      return acc+= (currValue.totalCost || 0)
    }
    return acc
  },0)

  console.log({
    totalCost
  })
} catch (error) {
  console.error(error);
}
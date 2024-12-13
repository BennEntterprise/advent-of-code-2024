import fs from "fs";
import { parseGames } from "./utils/parseGames";
import { tryToWinPrize } from './utils/tryToWinPrize'
import type { GameResult } from "./types";
const consts = {
  a: 3,
  b: 1,
};

try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, "utf8");

  const gameBlobs = input.split("\n\n");

  const gameSpecs = gameBlobs.map((gb) => gb.split("\n"));

  // Massage the game specs into objects we can work with.
  const games = parseGames(gameSpecs);

  const results: GameResult[] = []
  for(let game of games){
    results.push(tryToWinPrize(game))
  }
  console.log(results)
} catch (error) {
  console.error(error);
}
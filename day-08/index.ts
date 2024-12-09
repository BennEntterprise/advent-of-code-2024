import fs from 'fs'

try {
  const grid = readInput(`${__dirname}/sample-input.txt`)
  const anntennae = getAnntennae(grid)
  console.log(anntennae)
  
} catch (e: any) {
  console.error(e)
}   

function readInput(filePath: string): string[] {
    return fs.readFileSync(filePath, 'utf-8').trim().split('\n');
}

function getAnntennae(grid: string[]){
  const antennae: Record<string /* signal name */,Array<[number /*yCoord*/, number /*xCoord*/]>> = {}
  for(let row = 0 ; row < grid.length; row++){
    for(let col = 0; col < grid[row].length; col++){
        const potentialSignal = grid[row][col]
        if(potentialSignal !== '.'){
            // Add to Anntennae
            if(!antennae[potentialSignal]){
                antennae[potentialSignal] = []
                antennae[potentialSignal].push([row, col])
            } else {
                antennae[potentialSignal].push([row, col])
            }
        }
    }
  }
  return antennae
}
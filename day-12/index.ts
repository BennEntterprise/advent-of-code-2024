import fs from 'fs';

type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type GridValue = Letter | '';
type Garden = Array<Array<string>>;
type Plot = {
  plotLetter: Letter;
  plotShape: Array<Array<GridValue>>
}

type PlotSize = {
  perimeter: number;
  area: number
}

const directions = [
  [-1,0],
  [0,1],
  [1,0],
  [0,-1]
] 


try {
  const input = fs.readFileSync(`${__dirname}/sample-input1.txt`, 'utf8');  
  const garden = input.split('\n').map(line => line.split(''))

  // Iterate through the garden creating plots. The function will work by moving 
  // through y,x coordinates and will try to find contiguous members. Each time 
  // we visit a new member, if it has any members we push it into a queue for checking later
  // as we make up the map we keep track of it's shape in an array of plots.
  const plots = createPlots(garden)

  const plotSizes: Array<PlotSize> = calculatePlotSizes(plots)

  const totalCost = calculatePlotCosts(plotSizes)
  
  console.log({totalCost})
} catch (error) {
  console.error(error)
}

function calculatePlotCosts(plotSizes: Array<PlotSize>):number{
  const totalCost = 0
  return totalCost
}

function createPlots(garden: Garden): Array<Plot>{  
  const plots: Array<Plot> = []
  const plotVisited = garden.map(row => row.map(x => ''))

  for(let y = 0; y < garden.length; y++){
    for(let x = 0; x < garden[y].length; x++){
      let currentLetter = garden[y][x]
      const plot = mapOutThePlot(currentLetter, [y,x], garden)
    }
  }

  return plots
}

function mapOutThePlot(letter: string, startingCoords: [number, number], garden:Garden){
  const visitedCoords: Array<[number, number]> = []
  let needToVisit: Array<[number, number]> = [startingCoords]

  while(needToVisit.length > 0){
    // Grab the 0th element, run our heatseeking on it, then push it into the visited coords array
    let currentCoords = needToVisit.shift()
    if(!currentCoords){
      return;
    }
    let [currY, currX] = currentCoords

    // Check four directions, pushing them into the queue.
    for(let direction of directions){
      let [yIncr , xIncr] = direction
      if(
        garden[currY+yIncr] !== undefined
        && garden[currY+yIncr][currX+xIncr] !== undefined
        )
      {
        if(garden[currY+yIncr][currX+xIncr] === letter){
          needToVisit.push([currY + yIncr, currX + xIncr])
        } else {
          continue;
        }
      }
    }
    
    visitedCoords.push(currentCoords as [number, number]) // HACK: tell TS to shut up because we know it exists, if the needToVisit was empty we wouldn't enter the loop and so couldn't possible get undefined back from .shift()
    console.log({
      visitedCoords: visitedCoords.length,
      needToVisit: needToVisit.length
    })
  }
  


  return {
    visitedCoords
  }
}

function calculatePlotSizes(plots: Array<Plot>): Array<PlotSize>{
  const plotSizes: Array<PlotSize> = []
  return plotSizes;
}

function countPerimeterOccurrences(): number{
  const perimeterCount = 0
  return perimeterCount
}
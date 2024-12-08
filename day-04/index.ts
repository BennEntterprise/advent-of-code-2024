import fs from 'fs'
function countXmasOccurrences(grid: string[]): number {
  const word = "XMAS";
  const wordLength = word.length;
  const rows = grid.length;
  const cols = grid[0].length;

  // Define all 8 possible directions (dx, dy)
  const directions: [number, number][] = [
      [0, 1],   // Right
      [0, -1],  // Left
      [1, 0],   // Down
      [-1, 0],  // Up
      [1, 1],   // Down-right
      [1, -1],  // Down-left
      [-1, 1],  // Up-right
      [-1, -1]  // Up-left
  ];

  function isValid(x: number, y: number): boolean {
      return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function checkWord(x: number, y: number, dx: number, dy: number): boolean {
      for (let i = 0; i < wordLength; i++) {
          const nx = x + i * dx;
          const ny = y + i * dy;
          if (!isValid(nx, ny) || grid[nx][ny] !== word[i]) {
              return false;
          }
      }
      return true;
  }

  let count = 0;

  // Iterate over each cell in the grid
  for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
          // Check all directions from this cell
          for (const [dx, dy] of directions) {
              if (checkWord(x, y, dx, dy)) {
                  count++;
              }
          }
      }
  }

  return count;
}

try {
  const file = fs.readFileSync(`${__dirname}/puzzle-input.txt`, 'utf-8')
  let lines = file.split('\n')
  const count = countXmasOccurrences(lines)
  console.log(count)

  // Find all of the "X". 
  // For Each x, check for an "M" in each of the 9 directions
  // If you have an "M", continue in that direction for an "A", and "S", if not found, then skip.
  // Assuming you can find each then incrmenet the XMAS Count.

  // NOTE: For the following Grid....
  // [
  //   [1,2,3]
  //   [4,5,6]
  //   [7,8,9]
  // ]
  // To access #6 we would use Grid[1][2], or [y][x] notation cuz things 
  // different in CS. The origin (0,0) is the top left with the bottom right
  // being at y_max, x_max
  
  
} catch (e: any) {
  console.error(e)
}


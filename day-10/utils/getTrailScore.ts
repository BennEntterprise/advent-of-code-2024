import { Grid } from "..";
type Coordinate = [number, number];
type Path = Coordinate[];

const directionMap = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1]
} as const;

export function getTrailHeadScore(grid: Grid, trailHeadCoord: [number, number]): number {
  const [y, x] = trailHeadCoord;
  let trailScore = 0;
  let currentY = y;
  let currentX = x;

  const paths = findPaths(grid, [y, x]);
  trailScore += paths;

  return trailScore;
}


function findPaths(grid: Grid, start: Coordinate): number {
    const directions: Coordinate[] = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1]   // Right
    ];
    const rows = grid.length;
    const cols = grid[0].length;
    const queue: { coord: Coordinate, path: Path }[] = [];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const paths: Path[] = [];

    // Initialize the queue with the starting point
    queue.push({ coord: start, path: [start] });
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const { coord, path } = queue.shift()!;
        const [x, y] = coord;
        const currentValue = grid[x][y];

        // Check if we've reached a "9"
        if (currentValue === 9) {
            paths.push(path);
        }

        // Explore neighbors
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                !visited[newX][newY] &&
                grid[newX][newY] === currentValue + 1 // Ensure the move is a single step up
            ) {
                visited[newX][newY] = true;
                queue.push({ coord: [newX, newY], path: [...path, [newX, newY]] });
            }
        }
    }

    return paths.length;
}
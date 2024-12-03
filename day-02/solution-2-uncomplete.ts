import fs from 'fs'

// Read the file as an array line by line
let lines;

try {
    const file = fs.readFileSync(`${__dirname}/puzzle-input-2.txt`, 'utf-8')
    lines = file.split('\n')
} catch (e: any) {
    console.log(e.stack)
}

let safeCounter = 0
const lengths = new Map<number, number>()
lines?.forEach((line, index) => {
let problemDampener = 0;
  const levels = line.split(" ");

  // Check if the line is safe,
  // it should be ALWAYS INCREASING or ALWAYS DECREASING
  // it should each level should differ by at least one and at most three
    let isSafe = true;
    let isIncreasing;
    for (let i = 0; i < levels.length - 1; i++) {
        // Setup for the loop
        const currentLevel = parseInt(levels[i]);
        const nextLevel = parseInt(levels[i + 1]);
        const diffRel =  nextLevel - currentLevel;
        const diff = Math.abs(diffRel);

        if (diff < 1 || diff > 3) {
            isSafe = false;
            break;
        }

        if (i === 0){
            // Set increasing or decreasing on the first iteration
            if (diffRel > 0) {
                isIncreasing = true;
            } else if (diffRel < 0) {
                isIncreasing = false;
            } else {
                isSafe = false;
                break;
            }
        } else {
            // Check if the levels are increasing or decreasing
            if (isIncreasing && diffRel < 0) {
                isSafe = false;
                break;
            } else if (!isIncreasing && diffRel > 0) {
                isSafe = false;
                break;
            }
        }
    }
    // If we've gotten to here, the increment our safe counter
    if (isSafe) {
        safeCounter++;
    }
});

console.log(safeCounter)
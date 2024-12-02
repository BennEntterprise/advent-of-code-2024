import fs from 'fs';

/**
 * This section requires finding a number in the "left list", 
 * check how many times it appears in the right list, then 
 * multiply that quantity, by the source number.
 * 
 * Having done this for each item in the left list, sum
 * thees up for the final answer. 
 */

const leftArray: Array<number> = []
const rightFrequencyCount: Map<number, number> = new Map()

try {
    const data = fs.readFileSync(`${__dirname}/puzzle-input-1.txt`, 'utf8'); 
    // console.log(data);
    const lines = data.split('\n')
    // console.log(lines)    
    lines.forEach((line) => {
        const [ leftPart, rightPart ] = line.split(/\s+/)
        const leftInt = parseInt(leftPart)
        const rightInt = parseInt(rightPart)

        // Push the Left Piece into the leftArray
        leftArray.push(leftInt)

        // Update Right side Frequency
        if(rightFrequencyCount.get(rightInt)) {
            const current = rightFrequencyCount.get(rightInt) || 0 // HACK: TS says might be undefined, but we know it should
            rightFrequencyCount.set(rightInt, current + 1)
        } else {
            rightFrequencyCount.set(rightInt, 1)
        }

    })
} catch (e:any) {
    console.error(e);
}


// Move through each element of left array, checking for it in the right
// and multiplying.

const multiplications: Array<number> = []
leftArray.forEach((firstFactor) => {
    if(rightFrequencyCount.has(firstFactor)){
        const secondFactor = rightFrequencyCount.get(firstFactor) || 0
        multiplications.push(firstFactor * secondFactor)
    }
})

// Sum up the Multiplications
const summation = multiplications.reduce((cur, acc) => {
    return acc + cur
}, 0)

console.log('Solution: ', summation)
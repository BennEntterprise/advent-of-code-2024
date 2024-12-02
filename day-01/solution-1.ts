import fs from 'fs';

let parsedArray1: number[] = [];
let parsedArray2: number[] = [];
try {
    const input = fs.readFileSync(`${__dirname}/puzzle-input-1.txt`, 'utf-8');
    const lines = input.split('\n');
    lines.forEach((line) => {
        const [firstMember, secondMember] = line.split(/\s+/);
        parsedArray1.push(parseInt(firstMember));
        parsedArray2.push(parseInt(secondMember));
    })
} catch (e: any) {
    console.log('Error:', e.stack);
}

// Sort both arrays (in-place is fine)
parsedArray1.sort((a, b) => a - b);
parsedArray2.sort((a, b) => a - b);

// Find the difference between each corresponding element of the two arrays
const differences = parsedArray1.map((value, index) => Math.abs(value - parsedArray2[index]));

const summation = differences.reduce((acc, curr) => acc + curr, 0);

console.log(summation)
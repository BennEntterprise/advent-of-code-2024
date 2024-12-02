import fs from 'fs'


// Read the file as an array line by line
let lines;

try {
    const file = fs.readFileSync(`${__dirname}/puzzle-input-2.txt`, 'utf-8')
    lines = file.split('\n')
} catch (e: any) {
    console.log(e.stack)
}

// Rules

// Levels are ALL INCREASING or ALL DECRESING

// Adjacent levels differ by at least one, and at most three
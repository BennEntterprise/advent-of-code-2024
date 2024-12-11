import fs from 'fs';

try {
  const input = fs.readFileSync(`${__dirname}/sample-input.txt`, 'utf8');  
} catch (error) {
  console.error(error)
}
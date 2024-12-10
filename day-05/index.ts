import fs from 'fs'
type Rule = [number, number];
type Update = number[];

try {
  const input = fs.readFileSync(`${__dirname}/puzzle-input.txt`, 'utf-8')
  console.log(solve(input))

} catch (e: any) {
  console.error(e.stack)
}

function parseInput(input: string): { rules: Rule[], updates: Update[]}{
  const sections = input.trim().split('\n\n')
  const rules = sections[0].split('\n').map(line => line.split('|').map(Number) as Rule)
  const updates = sections[1].split('\n').map(line => line.split(',').map(Number))  
  return {rules, updates}
}

function isCorrectOrder(update: Update, rules: Rule[]): boolean {
  const orderMap = new Map<number, Set<number>>()

  // Build the order map from rules
  for (const [before, after] of rules) {
    if(!orderMap.has(before)){
      orderMap.set(before, new Set())
    }
    orderMap.get(before)!.add(after)
  }

  // Create a map of page indexes for the current update
  const indexMap = new Map<number, number>()
  update.forEach((page, index) => indexMap.set(page, index))

  // Check each rule for current update
  for (const [before, after] of rules){
    if(indexMap.has(before) && indexMap.has(after)){
      const indexOfBefore = indexMap.get(before)
      const indexOfAfter = indexMap.get(after)
      if(indexOfBefore! > indexOfAfter!){
        return false
      }
    }
  }

  return true
}

function findMiddlePage(updates: Update): number {
  const middleIndex = Math.floor(updates.length / 2)
  return updates[middleIndex]
}

function solve(input: string): number {
  const { rules, updates } = parseInput(input)
  let sumOfMiddlePages = 0;

  for (const update of updates){
    // For Each set of updates
    if(isCorrectOrder(update, rules)){
      sumOfMiddlePages+= findMiddlePage(update)
    }  
  }
  return sumOfMiddlePages
}


// BAD GUESSES: 
// 10984 (Too High)
// 10885 (Too High)
// 7558 (Too high)
// 4568 (Too Low)

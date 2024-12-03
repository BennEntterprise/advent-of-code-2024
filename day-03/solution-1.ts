import fs from 'fs'


try {
  // Read the File in 
  const file = fs.readFileSync(`${__dirname}/puzzle-input-3.txt`, 'utf-8')

  // Split every character.
  const parts = file.split('')

  // Regex for number, comma, parenthesis and "m", "u", "l"
  const betterParts = parts.filter((part) => {
    if (part.match(/[\d\,\(\)mul]/)) {
      return true
    } else {
        return false
    }
  })

//   console.log(betterParts.join(''))

  let keepNextPart = true;
  const partsWithoutEmptyParens = betterParts.filter((part, index) => {
    if(!keepNextPart) {
        keepNextPart = true;
        return false;
    }

    if (part === '(' && betterParts[index+1] === ')') {
      keepNextPart = false;
      return false
    } else {
      keepNextPart= true;
      return true
    }
  })

  console.log("OUTPUT")
  console.log(partsWithoutEmptyParens.join(''))
} catch (e: any) {
  console.error(e)
}
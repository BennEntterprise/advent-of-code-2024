import fs from 'fs'
import LogicGates from './utils/LogicGates';

const sampleExpectedResult = 4;

try {
  const input = fs.readFileSync(`./sample-input.txt`, 'utf8')
  const [initialStateLines, circuitLines] = input.split('\n\n')
  const initialStateMap = new Map<string, number>()
  initialStateLines.split('\n').forEach(line => {
    const [key, value] = line.split(': ')
    initialStateMap.set(key.trim(), parseInt(value))
  })

  const circuitMap = new Map<string, Array<string>>()
  circuitLines.split('\n').forEach(line => {
    const [key, value] = line.split(' -> ')
    const [operand1, operation, operand2] = key.split(' ')
    circuitMap.set(value.trim(), [operand1, operation, operand2])
  })

} catch (e){
  console.error(e)
}

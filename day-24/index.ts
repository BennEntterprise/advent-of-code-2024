import fs from 'fs'
import LogicGates from './utils/LogicGates';
import { getCircuitOutput } from './utils/getCircuitOutput';
import { evaluateCircuit } from './utils/evaluateCircuit';
import { topologicalSort } from './utils/topologicalSort';
import { validateGraph } from './utils/validateGraph';
import { buildGraph } from './utils/buildGraph';
const sampleExpectedResult = 4;

try {
  const inputLines = fs.readFileSync(`./puzzle-input.txt`, 'utf8').split('\n')
  
  const graph = buildGraph(inputLines)
  if(!validateGraph(graph)){
    process.exit(0)
  }
  const sortedOrder = topologicalSort(graph)
  const results = evaluateCircuit(graph, sortedOrder)
  const finalResults = getCircuitOutput(results)
  console.log(finalResults)
} catch (e){
  console.error(e)
}

// Results 
// 0 -> Incorrect
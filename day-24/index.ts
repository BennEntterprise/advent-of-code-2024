import fs from 'fs'
import LogicGates from './utils/LogicGates';
interface Node {
  name: string;
  value?: number;  // for initial values
  operation?: {
      type: 'AND' | 'OR' | 'XOR';
      inputs: string[];  // names of input wires
  };
  dependencies: string[];  // names of wires this node depends on
}

type Graph = Map<string, Node>;
interface GateOperations {
  AND: (a: number, b: number) => number;
  OR: (a: number, b: number) => number;
  XOR: (a: number, b: number) => number;
}

const gateOperations: GateOperations = {
  AND: (a, b) => a && b ? 1 : 0,
  OR: (a, b) => a || b ? 1 : 0,
  XOR: (a, b) => a !== b ? 1 : 0
};
const sampleExpectedResult = 4;

try {
  const inputLines = fs.readFileSync(`./sample-input.txt`, 'utf8').split('\n')
  
  const graph = buildGraph(inputLines)
  if(!validateGraph(graph)){
    process.exit(0)
  }
  // console.log(graph)
  const sortedOrder = topologicalSort(graph)
  // console.log(sortedOrder)
  const results = evaluateCircuit(graph, sortedOrder)
  // console.log(results)
  const finalResults = getCircuitOutput(results)
  console.log(finalResults)
  process.exit(0)

} catch (e){
  console.error(e)
}
function buildGraph(input: string[]): Graph {
  const graph = new Map<string, Node>();

  // First pass: Process initial values
  for (const line of input) {
      if (line.includes(':')) {
          const [name, valueStr] = line.split(': ');
          graph.set(name, {
              name,
              value: parseInt(valueStr),
              dependencies: [],
              operation: undefined
          });
      }
  }

  // Second pass: Process operations
  for (const line of input) {
      if (line.includes('->')) {
          const parts = line.split(' ');
          const outputWire = parts[parts.length - 1];
          const operationType = parts[1]; // AND, OR, or XOR
          const input1 = parts[0];
          const input2 = parts[2];

          graph.set(outputWire, {
              name: outputWire,
              dependencies: [input1, input2],
              operation: {
                  type: operationType as 'AND' | 'OR' | 'XOR',
                  inputs: [input1, input2]
              }
          });
      }
  }

  return graph;
}
function validateGraph(graph: Graph): boolean {
  for (const [name, node] of graph.entries()) {
      // Check if all dependencies exist
      if (node.dependencies) {
          for (const dep of node.dependencies) {
              if (!graph.has(dep)) {
                  console.error(`Wire ${dep} referenced but not defined`);
                  return false;
              }
          }
      }
      // Check operation type if present
      if (node.operation && !['AND', 'OR', 'XOR'].includes(node.operation.type)) {
          console.error(`Invalid operation type: ${node.operation.type}`);
          return false;
      }
  }
  return true;
}


function topologicalSort(graph: Graph): string[] {
  const visited = new Set<string>();
  const sorted: string[] = [];
  
  function visit(nodeName: string) {
      // Check for cycles (though problem guarantees none)
      if (visited.has(nodeName)) {
          return;
      }
      
      visited.add(nodeName);
      
      // Get the node and process its dependencies
      const node = graph.get(nodeName)!;
      for (const dep of node.dependencies) {
          visit(dep);
      }
      
      // After processing all dependencies, add this node
      sorted.unshift(nodeName); // Add to front of array
  }
  
  // Find all nodes that are outputs (start with 'z')
  for (const [nodeName] of graph) {
      if (nodeName.startsWith('z')) {
          visit(nodeName);
      }
  }
  
  return sorted;
}




function evaluateCircuit(graph: Graph, sortedOrder: string[]): Map<string, number> {
  const results = new Map<string, number>();
  
  // First, add all initial values
  for (const [name, node] of graph) {
      if (node.value !== undefined) {
          results.set(name, node.value);
      }
  }
  
  // Process nodes in sorted order
  for (const nodeName of sortedOrder) {
      const node = graph.get(nodeName)!;
      if (node.operation) {
          const input1 = results.get(node.operation.inputs[0])!;
          const input2 = results.get(node.operation.inputs[1])!;
          const result = gateOperations[node.operation.type](input1, input2);
          results.set(nodeName, result);
      }
  }
  
  return results;
}


function getCircuitOutput(results: Map<string, number>): number {
  // Get all z-wires and sort them numerically
  const zWires = Array.from(results.keys())
      .filter(wire => wire.startsWith('z'))
      .sort((a, b) => {
          // Extract numbers from z00, z01, etc and compare
          const numA = parseInt(a.slice(1));
          const numB = parseInt(b.slice(1));
          return numA - numB;
      });
  
  // Build binary string from z-wires (z00 is least significant bit)
  const binaryString = zWires
      .map(wire => results.get(wire))
      .reverse()  // Reverse because z00 is least significant
      .join('');
  
  // Convert binary string to decimal
  return parseInt(binaryString, 2);
}

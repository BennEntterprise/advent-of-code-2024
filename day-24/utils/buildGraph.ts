import { Graph , Node} from "../types";

export function buildGraph(input: string[]): Graph {
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

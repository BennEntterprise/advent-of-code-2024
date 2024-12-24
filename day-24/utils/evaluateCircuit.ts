import { Graph } from '../types';
import { gateOperations } from './gateOperations';

export function evaluateCircuit(graph: Graph, sortedOrder: string[]): Map<string, number> {
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

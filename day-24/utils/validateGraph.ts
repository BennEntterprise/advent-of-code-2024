import { Graph } from "../types";

export function validateGraph(graph: Graph): boolean {
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

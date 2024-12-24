import { Graph } from "../types";

export function topologicalSort(graph: Graph): string[] {
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

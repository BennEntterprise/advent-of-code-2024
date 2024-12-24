import fs from 'fs';
import { buildGraph } from './utils/buildGraph';
import { validateGraph } from './utils/validateGraph';

export interface Node {
  name: string;
  value?: number;  // for initial values
  operation?: {
      type: 'AND' | 'OR' | 'XOR';
      inputs: string[];  // names of input wires
  };
  dependencies: string[];  // names of wires this node depends on
}

export type Graph = Map<string, Node>;
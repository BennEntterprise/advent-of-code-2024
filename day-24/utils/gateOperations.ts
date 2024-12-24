
export interface GateOperations {
  AND: (a: number, b: number) => number;
  OR: (a: number, b: number) => number;
  XOR: (a: number, b: number) => number;
}


export const gateOperations: GateOperations = {
  AND: (a, b) => a && b ? 1 : 0,
  OR: (a, b) => a || b ? 1 : 0,
  XOR: (a, b) => a !== b ? 1 : 0
};

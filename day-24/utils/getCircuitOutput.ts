export function getCircuitOutput(results: Map<string, number>): number {
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
    .reverse() // Reverse because z00 is least significant
    .join('');

  // Convert binary string to decimal
  return parseInt(binaryString, 2);
}

import { calculateBitwiseXOR } from './calculateBitwiseXOR';

export function mix(secretValue: number, mixingValue: number): number {
  // Convert each value to a binary string representation
  const secretValueBinary = secretValue.toString(2);
  const mixingValueBinary = mixingValue.toString(2);

  // Run the bitwise XOR operation on the two binary strings
  const result = calculateBitwiseXOR(secretValueBinary, mixingValueBinary);

  return result;
}

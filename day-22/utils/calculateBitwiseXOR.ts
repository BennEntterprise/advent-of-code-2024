export function calculateBitwiseXOR(value1: any, value2: any): number {
  // Make sure the two values are the same length
  const length = Math.max(value1.length, value2.length);
  value1 = value1.padStart(length, '0');
  value2 = value2.padStart(length, '0');

  // Perform the XOR operation
  let result = '';
  for (let i = 0; i < length; i++) {
    result += value1[i] === value2[i] ? '0' : '1';
  }

  // Convert back to a decimal number
  const decimalResult = parseInt(result, 2);

  return decimalResult
}

/**
 * @description a function that takes a secret number and
 * returns a modulo operation
 * @param value
 * @returns
 */
export function prune(value: number): number {
  const result = value % 16777216;
  return result;
}

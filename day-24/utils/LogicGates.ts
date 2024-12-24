
class LogicGates {
  static OR(a: number, b: number) {
    if (a !== 0 && a !== 1) throw new Error('Input a must be 0 or 1');
    if (b !== 0 && b !== 1) throw new Error('Input b must be 0 or 1');
    return a | b
  }
  static AND(a: number, b: number) {
    if (a !== 0 && a !== 1) throw new Error('Input a must be 0 or 1');
    if (b !== 0 && b !== 1) throw new Error('Input b must be 0 or 1');
    return a & b
  }
  static XOR (a: number, b: number) { 
    if (a !== 0 && a !== 1) throw new Error('Input a must be 0 or 1');
    if (b !== 0 && b !== 1) throw new Error('Input b must be 0 or 1');
    return a ^ b
  }
}

export default LogicGates;
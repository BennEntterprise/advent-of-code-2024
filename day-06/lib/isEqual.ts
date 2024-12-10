/**
 * @description Lifted from Lodash library so I didn't need to import it and mess around with package.json/node_modules etc
 * @param value 
 * @param other 
 * @returns 
 */
function isEqual(value: any, other: any) {
  // Check if the values are identical
  if (value === other) {
    return true;
  }

  // Check if either value is null or undefined
  if (value == null || other == null) {
    return false;
  }

  // Check if both values are objects
  if (typeof value === 'object' && typeof other === 'object') {
    // Get the keys of each object
    const valueKeys = Object.keys(value);
    const otherKeys = Object.keys(other);

    // Check if they have the same number of keys
    if (valueKeys.length !== otherKeys.length) {
      return false;
    }

    // Recursively check each key
    for (let key of valueKeys) {
      if (!other.hasOwnProperty(key) || !isEqual(value[key], other[key])) {
        return false;
      }
    }

    return true;
  }

  // If they are not objects and not strictly equal, they are not equal
  return false;
}


export default isEqual;
import fs from 'fs'

try {
  const input = fs.readFileSync(`./puzzle-input.txt`, 'utf8')
  const lines = input.split('\n')
  const connections = lines.map(line => {
    const [computerA, computerB] = line.split('-')
    return [computerA, computerB]
  })

  const connectionMap = new Map<string /**computerName */, Set<string> /**It's connections */>()
  connections.forEach(([computerA, computerB]) => {
    if (!connectionMap.has(computerA)) {
      connectionMap.set(computerA, new Set<string>())
    }
    if (!connectionMap.has(computerB)) {
      connectionMap.set(computerB, new Set<string>())
    }
    connectionMap.get(computerA)?.add(computerB)
    connectionMap.get(computerB)?.add(computerA)
  })


  const triangles = createTriangles(connectionMap)
  const triangleCount = triangles.length

  console.log(triangles, triangleCount)

} catch (error) {
  console.error(error)
}

/**
 * @description A function to create triangles from the given connections
 * @param connectionMap A map of connections
 * @returns {Array<Array<string>>} An array of triangles
 */
function createTriangles(connectionMap: Map<string, Set<string>>): Array<Array<string>> {
  const triangles: Array<Array<string>> = []
  for (const [computerA, connections] of connectionMap) {
    for (const computerB of connections) {
      if (computerA < computerB) {
        for (const computerC of connections) {
          if (computerB < computerC && connectionMap.get(computerB)?.has(computerC)) {
            if([computerA, computerB, computerC].some(computer => computer.startsWith('t'))) {
              triangles.push([computerA, computerB, computerC])
            }
          }
        }
      }
    }
  }
  return triangles
}
import Robot from "../Robot"

export function getStartingPositions(input: string){
  const robotDescriptions = input.split('\n')
  let robots: Robot[] = robotDescriptions.map((rDesc) =>{
    const [positionDescription, velocityDescription] = rDesc.split(' ')
    const [_p, xPos, yPos] = positionDescription.split(/,|=/)
    const [_v, xVel, yVel] = velocityDescription.split(/,|=/)

    return new Robot(parseInt(xPos), parseInt(yPos), parseInt(xVel),parseInt(yVel))
  })

  return robots;
}
import type {Robot as RobotType} from './types'

class Robot implements RobotType{
  position = { x: 0,  y: 0 };
  velocity = { x: 0, y: 0 }
  /**
   * 
   * @param xPos 
   * @param yPos 
   * @param xVel 
   * @param yVel 
   * @returns {RobotType}
   */
  constructor(xPos: number, yPos: number, xVel: number, yVel: number){
    if (isNaN(xPos) || isNaN(yPos) || isNaN(xVel) || isNaN(yVel)) {
      throw new Error('Invalid input: position and velocity values must be numbers.');
    }
    this.position.x = xPos
    this.position.y = yPos
    this.velocity.x = xVel
    this.velocity.y = yVel
    return this;
  }
}

export default Robot
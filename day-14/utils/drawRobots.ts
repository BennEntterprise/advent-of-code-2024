import Robot from "../Robot";

export function drawRobots(robots: Robot[], room: Array<Array<any>>){
  // For Each robot, put them on the map, if a robot already exists there
  // put a "#" to indicate a big pile'o'bots.
  const map = Array.from({ length: room.length }, () => Array(room[0].length).fill('.'));

  robots.forEach((robot, index) =>{
    let {x, y} = robot.position
    if(room[y] && room[y][x]){
      let gridValue = room[y][x]
      if(gridValue !== '.'){
        map[y][x] = '#'
      } else {
        map[y][x] = index
      }
    }   
  })

  console.log(map.map(line => line.join('')).join('\n') )
}

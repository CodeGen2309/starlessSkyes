export default class star {
  constructor (x, y, radius, velocity, color = 'white', shineFactor=-1) {
    this.x = x
    this.y = y

    this.radius = radius
    this.origin = radius
    this.color = color

    this.velocity = velocity
    this.shineFactor = shineFactor

    this.hitBox = {
      startPoint: {x: this.x - 10, y: this.y - 10},
      endPoint: {x: this.x + 10, y: this.y + 10},
    }

    this.isShining = false
  }
}
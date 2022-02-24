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

  reCalcHitBox () {
    this.hitBox = {
      startPoint: {x: this.x - 10, y: this.y - 10},
      endPoint: {x: this.x + 10, y: this.y + 10},
    }
  }

  shine (minRadius=1, shineDelta=0.08) {
    if (this.radius <= minRadius) {this.shineFactor = 1}
    
    this.radius += this.shineFactor*shineDelta

    if (this.radius >= this.origin) {this.shineFactor = -1}
    if (this.radius < 0) {this.radius = 0}
  }

  move (cWidth, cHeight , vDelta = 0.02) {
    this.x -= this.velocity * vDelta

    if (this.x < 0) {
      this.x = cWidth
      this.y = this.getRandomNumber(0, cHeight)
      this.radius = this.getRandomNumber(5, 15)
      this.origin = this.radius
    }

    this.reCalcHitBox()
  }

  getRandomNumber (from=1, to=10) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }
}
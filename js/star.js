export default class star {
  constructor (x, y, radius, velocity, color='white', shineFactor=-1) {
    this.x = x
    this.y = y

    this.radius = radius
    this.origin = radius
    this.color = color
    
    this.velocity = velocity
    this.shineFactor = shineFactor
    this.opacity = 1


    this.hitBox = {
      startPoint: {x: this.x - 10, y: this.y - 10},
      endPoint: {x: this.x + 10, y: this.y + 10},
    }

    this.isShining = true
    this.isMoving = true
    this.isBlowing = false
  }


  shine (minRadius=1, shineDelta=0.08) {
    if (this.radius <= minRadius) {this.shineFactor = 1}
    
    this.radius += this.shineFactor*shineDelta

    if (this.radius >= this.origin) {this.shineFactor = -1}
    if (this.radius < 0) {this.radius = 0}
  }


  move (cWidth, cHeight, vDelta = 0.02) {
    this.x -= this.velocity * vDelta

    if (this.x < 0) {
      this.x = cWidth
      this.resetPosition(cHeight)
    }

    if (this.x > cWidth) {
      this.x = 0
      this.resetPosition(cHeight)
    }

    this.hitBox = {
      startPoint: {x: this.x - 10, y: this.y - 10},
      endPoint: {x: this.x + 10, y: this.y + 10},
    }
  }

  resetPosition (cHeight) {
    this.y = this.getRandomNumber(0, cHeight)
    this.radius = this.getRandomNumber(5, 15)
    this.origin = this.radius
  }


  blow () {
    let blowDelta, maxRadius

    blowDelta = 5
    maxRadius = 100
    this.radius += blowDelta

    if (this.radius >= maxRadius) {
      this.opacity -= 0.1
      this.color = `rgba(255, 255, 255, ${this.opacity})`
    }

    if (this.opacity <= 0) {
      this.radius = this.origin
      this.opacity = 1
      this.color = 'rgba(255, 255, 255, 1)'
  
      this.isBlowing = false
      this.isShining = true
      this.isMoving = true  
    }
  }

  getRandomNumber (from=1, to=10) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }
}
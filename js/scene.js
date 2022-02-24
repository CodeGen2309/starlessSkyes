import star from "./star.js"
import spaceShip from './ship.js'

export default class scene {
  constructor (container, skyColors) {
    this.container = document.querySelector(container)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    
    this.ctx = this.canvas.getContext('2d')
    this.skyColors = skyColors
    this.stars = []
    
    this.starClass = star
    this.ship = new spaceShip(300, 300)
    
    this.resizeCanvas() 
  }

  
  resizeCanvas () {
    this.canvas.width = this.container.clientWidth
    this.canvas.height = this.container.clientHeight
    this.redraw()
  }


  fillSky () {
    let gradient, numIndex, colOffset,
    cWidth, cHeight

    cWidth = this.canvas.width
    cHeight = this.canvas.height
    gradient = this.ctx.createLinearGradient(0, 0, cWidth, cHeight)

    for (let colIndex in this.skyColors) {
      numIndex = Number(colIndex)
      colOffset = (1 / this.skyColors.length) * (numIndex + 1)
      gradient.addColorStop(colOffset, this.skyColors[colIndex])
    }

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  lightUpTheStars (starCount = 40) {
    let widthDelta, curRegion, 
    tempX, tempY, tempRadius, tempVelocity

    widthDelta = this.canvas.width / starCount
    curRegion = 0

    for (let i = 0; i < starCount; i++) {
      tempX = this.getRandomNumber(curRegion, curRegion + widthDelta)
      tempY = this.getRandomNumber(0, this.canvas.height)

      tempRadius = this.getRandomNumber(5, 15)
      tempVelocity = this.getRandomNumber(1, 10)
      curRegion += widthDelta

      this.stars.push(new this.starClass (tempX, tempY, tempRadius, tempVelocity))
    }

    for (let star of this.stars) {this.drawStar(star)}
  }


  drawStar (star) {
    this.ctx.beginPath()
    this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2)

    this.fillStar(star)
    this.ctx.closePath()
  }


  fillStar (star) {
    let gradient

    gradient = this.ctx.createRadialGradient(star.x, star.y, star.radius / 10, star.x, star.y, star.radius)
    gradient.addColorStop(0, star.color)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    this.ctx.fillStyle = gradient
    this.ctx.fill()
  }


  getRandomNumber (from=1, to=10) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }


  drawShip () {
    let ship = this.ship
    this.ctx.drawImage(ship.img, ship.x, ship.y)
  }


  redraw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fillSky()

    if (this.ship.isVisible) {this.drawShip()}
    for (let star of this.stars) {this.drawStar(star)}
  }
}
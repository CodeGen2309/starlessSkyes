import star from "./star.js"

export default class compositor {
  constructor (container, skyColors) {
    this.container = document.querySelector(container)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.resizeCanvas()
    
    this.ctx = this.canvas.getContext('2d')
    this.skyColors = skyColors
    this.stars = []
  }

  resizeCanvas () {
    this.canvas.width = this.container.clientWidth
    this.canvas.height = this.container.clientHeight
  }

  fillSky () {
    let gradient, numIndex, colOffset,
    cwidth, cheight

    cwidth = this.canvas.width
    cheight = this.canvas.height

    gradient = this.ctx.createLinearGradient(0, 0, cwidth, cheight)

    for (let colIndex in this.skyColors) {
      numIndex = Number(colIndex)
      colOffset = (1 / this.skyColors.length) * (numIndex + 1)
      gradient.addColorStop(colOffset, this.skyColors[colIndex])
    }

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  lightUpTheStars (starCount = 10) {
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

      this.stars.push(new star (tempX, tempY, tempRadius, tempVelocity))
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

  moveAnimation (vDelta = 0.02) {
    for (let star of this.stars) {
      star.x -= star.velocity * vDelta

      if (star.x < 0) {
        star.x = this.canvas.width
        star.y = this.getRandomNumber(0, this.canvas.height)
        star.radius = this.getRandomNumber(5, 15)
      }
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fillSky()
    for (let star of this.stars) {this.drawStar(star)}

    window.requestAnimationFrame(() => this.moveAnimation(vDelta))
  }
}
export default class compositor {
  constructor (star, container, skyColors) {
    this.container = document.querySelector(container)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.starClass = star
    this.resizeCanvas()
    
    this.ctx = this.canvas.getContext('2d')
    this.skyColors = skyColors
    this.spaceShip = null
    this.stars = []

    this.canvas.addEventListener('mousemove', ent => this.checkCollision(ent.x, ent.y))
  }

  checkCollision (x, y) {
    let checkX, checkY, collisionCheck,
    start, end

    if (this.spaceShip != null) {this.moveSpaceShip(x, y)}
    for (let star of this.stars) {
      start = star.hitBox.startPoint
      end = star.hitBox.endPoint
      
      checkX = false
      checkY = false
      collisionCheck = false
  
      if (x > start.x && x < end.x) {checkX = true}
      if (y > start.y && y < end.y) {checkY = true}
      if (checkX && checkY) {collisionCheck = true}
      if (collisionCheck == true) {star.isShining = true}
    }
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

  initSpaceShip () {
    let spaceShip, hitbox, imgPath, imgItem

    imgPath = '/sprites/spaceShip250.png'

    imgItem = document.createElement('img')
    imgItem.src = imgPath

    hitbox = {
      startPoint: [50, 50],
      endPoint: [100, 100]
    }

    spaceShip = {
      img: imgItem,
      x: 100, y: 100,
      hitbox: hitbox
    }

    this.canvas.style.cursor = 'none'
    this.spaceShip = spaceShip
  }

  drawSpaceShip () {
    let ship = this.spaceShip
    this.ctx.drawImage(ship.img, ship.x, ship.y)
  }

  moveSpaceShip (x, y) {
    let ship = this.spaceShip

    ship.x = x - 25
    ship.y = y - 25
    ship.hitbox.startPoint = [ship.x - 25, ship.y - 25]
    ship.hitbox.endPoint = [ship.x + 25, ship.y + 25]
  }

  moveStars (vDelta = 0.02) {
    for (let star of this.stars) {
      star.x -= star.velocity * vDelta
  
      if (star.x < 0) {
        star.x = this.canvas.width
        star.y = this.getRandomNumber(0, this.canvas.height)
        star.radius = this.getRandomNumber(5, 15)
      }
    }

    this.redraw()
    window.requestAnimationFrame(() => this.moveStars())
  }

  redraw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fillSky()

    for (let star of this.stars) {this.drawStar(star)}
    if (this.spaceShip != null) {this.drawSpaceShip()}
  }
}
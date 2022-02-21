export default class animator {
  constructor (sky) {this.sky = sky}

  getRandomNumber (from=1, to=10) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }

  shineAnimation (minRadius=1, shineDelta=0.08) {
    for (let star of this.sky.stars) {
      if (star.radius <= minRadius) {star.shineFactor = 1}
      
      if (star.isShining) {
        star.radius += star.shineFactor*shineDelta
      }

      if (star.radius >= star.origin) {
        star.isShining = false
        star.shineFactor = -1
      }
      if (star.radius < 0) {star.radius = 0}
    }

    this.sky.redraw()
    window.requestAnimationFrame(() => this.shineAnimation(minRadius, shineDelta))
  }

  moveAnimation (vDelta = 0.02) {
    let cWidth, cHeight

    cWidth = this.sky.canvas.width
    cHeight = this.sky.canvas.height

    for (let star of this.sky.stars) {
      star.x -= star.velocity * vDelta

      if (star.x < 0) {
        star.x = cWidth
        star.y = this.getRandomNumber(0, cHeight)
        star.radius = this.getRandomNumber(5, 15)
        star.origin = star.radius
      }

      star.hitBox = {
        startPoint: {x: star.x - 10, y: star.y - 10},
        endPoint: {x: star.x + 10, y: star.y + 10},
      }
    }

    this.sky.redraw()
    window.requestAnimationFrame(() => this.moveAnimation(vDelta))
  }
}
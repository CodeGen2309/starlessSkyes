import scene from "./scene.js"
import gamer from "./gamer.js"


export default class manager {
  constructor () {
    this.skyColors = [
      '#0f0c29', '#0f0c29', '#302b63',
      '#0f0c29', '#000000',   
    ]

    this.sky = new scene ('.app',this.skyColors)
    this.game = new gamer()

    this.cWidth = this.sky.canvas.width
    this.cHeight = this.sky.canvas.height
    this.screenSpeed = 0.01
    this.starSpeed = 0.01
    this.gameVelocity = -0.0005
    this.gameIsRun = false
  }

  setComposition () {
    this.sky.fillSky()
    this.sky.lightUpTheStars(100)
  }


  animateSkyes () {
    let starsSlowDown = !this.gameIsRun && this.starSpeed <= this.screenSpeed

    for (let star of this.sky.stars) {this.animateStar(star)}
    if (this.gameIsRun) {this.starSpeed += this.gameVelocity}
    if (starsSlowDown) {this.starSpeed -= this.gameVelocity * 10}
    
    this.sky.redraw()
    window.requestAnimationFrame(() => this.animateSkyes())
  }

  animateStar (star) {
    if (star.isMoving) {star.move(this.cWidth, this.cHeight, this.starSpeed)}
    if (star.isShining) {star.shine()}
    if (star.isBlowing) {star.blow()}
  }


  initGameInterfase () {
    let canvas, initIcon

    this.game.setInitIcon()
    this.game.initGameMenu()
    this.handleMenuButtons()

    canvas = this.sky.canvas
    canvas.addEventListener('mousemove', ent => this.onMouseMove(ent))

    initIcon = this.game.initIcon
    initIcon.addEventListener('click', () => this.initIconClick())
  }


  onMouseMove (ent) {
    if (this.gameIsRun) {
      this.sky.ship.move(ent.x - 25, ent.y - 25)
      this.checkCollisions(ent.x, ent.y)
    }
  }


  initIconClick () {
    this.game.showGameMenu()
    this.game.hideInitIcon()
    if (this.gameIsRun) {this.stopGame()}
  }


  handleMenuButtons () {
    let menu, play, options, quit

    menu = this.game.gameMenu
    play = this.game.playButton
    options = this.game.optButton
    quit = this.game.quitButton

    play.addEventListener('click', () => {
      this.game.hideGameMenu()
      this.game.showInitIcon()
      this.startGame()
    })

    quit.addEventListener('click', () => {
      this.game.hideGameMenu()
      this.game.showInitIcon()
    })
  }

  startGame () {
    this.gameIsRun = true
    this.sky.ship.isVisible = true
    this.sky.canvas.style.cursor = 'none'
  }

  stopGame () {
    this.gameIsRun = false
    this.sky.ship.isVisible = false
    this.sky.canvas.style = ''
  }

  checkCollisions (x, y) {
    for (let star of this.sky.stars) {
      let collision = this.game.checkCollision(x, y, star)

      if (collision) {
        star.isBlowing = true
        this.stopGame()
        return
      }
    }
  }
}
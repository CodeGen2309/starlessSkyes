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
    this.gameIsRun = false
  }

  setComposition () {
    this.sky.fillSky()
    this.sky.lightUpTheStars(100)
  }


  animateSkyes () {
    for (let star of this.sky.stars) {
      star.move(this.cWidth, this.cHeight)
      star.shine()
    }

    this.sky.redraw()
    window.requestAnimationFrame(() => this.animateSkyes())
  }


  initGameInterfase () {
    this.game.setInitIcon()
    this.game.initGameMenu()

    this.game.initIcon.addEventListener('click', () => {
      this.game.showGameMenu()
      this.game.hideInitIcon()

      if (this.gameIsRun) {this.stopGame()}
    })

    this.handleMenuButtons()
  
    this.sky.canvas.addEventListener('mousemove', ent => {
      if (this.sky.ship.isVisible) {
        this.sky.ship.move(ent.x, ent.y)
      }
    })
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
    this.sky.ship.isVisible = true
    this.gameIsRun = true
    this.sky.canvas.style.cursor = 'none'
  }

  stopGame () {
    this.gameIsRun = false
    this.sky.ship.isVisible = false
    this.sky.canvas.style = ''
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
}
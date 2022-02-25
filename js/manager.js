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
    for (let star of this.sky.stars) {
      if (star.isMoving) {star.move(this.cWidth, this.cHeight, this.starSpeed)}
      if (star.isShining) {star.shine()}
      if (star.isBlowing) {star.blow()}
    }

    if (this.gameIsRun) {this.starSpeed += this.gameVelocity}

    if (!this.gameIsRun && this.starSpeed <=  this.screenSpeed) {
      this.starSpeed -= this.gameVelocity * 5
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
      let collision, ship

      ship = this.sky.ship
      ship.move(ent.x - 25, ent.y - 25)

      if (!ship.isVisible) {return}
      for (let star of this.sky.stars) {
        collision = this.game.checkCollision(ship.x, ship.y, star)

        if (collision) {
          star.isBlowing = true
          this.stopGame()
        }
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
    this.gameIsRun = true
    this.sky.ship.isVisible = true
    this.sky.canvas.style.cursor = 'none'
  }

  stopGame () {
    this.gameIsRun = false
    this.sky.ship.isVisible = false
    this.sky.canvas.style = ''
  }
}
import star from './star.js'
import animator from "./animator.js"
import compositor from "./compositor.js"
import gamer from "./gamer.js"


export default class manager {
  constructor () {
    this.skyColors = [
      '#0f0c29', '#0f0c29', '#302b63',
      '#0f0c29', '#000000',   
    ]

    this.sky = new compositor (star, '.app',this.skyColors)
    this.animation = new animator ()
    this.game = new gamer()

    this.cWidth = this.sky.canvas.width
    this.cHeight = this.sky.canvas.height
  }

  setComposition () {
    this.sky.fillSky()
    this.sky.lightUpTheStars(100)
  }


  animateSkyes () {
    for  (let star of this.sky.stars) {
      this.animation.moveAnimation(this.cWidth, this.cHeight, star)
      this.animation.shineAnimation(star)
    }

    this.sky.redraw()
    window.requestAnimationFrame(() => this.animateSkyes())
  }

  initGameIcon () {
    this.game.setStartIcon()
    
    this.game.initIcon.addEventListener('click', () => {
      if (this.game.gameMenu != undefined) {return}
      this.game.initInterface()
      this.game.initIcon.classList.add('gInit_inactive')
      this.initMenuButtons()
      
      setTimeout(() => {
        this.game.initIcon.remove()
        this.game.initIcon = undefined
      }, 10);
    })
  }


  initMenuButtons () {
    let menu, play, options, quit
    if (this.game.gameMenu == undefined) {return}

    menu = this.game.gameMenu
    play = this.game.playButton
    options = this.game.optButton
    quit = this.game.quitButton

    quit.addEventListener('click', () => this.detachInterface())
    play.addEventListener('click', () => this.startGame())
  }

  detachInterface () {
    this.game.gameMenu.classList.remove('gMenu_active')

    if (this.sky.spaceShip != null) {
      this.sky.spaceShip = null
      this.sky.canvas.style = ''
    }

    setTimeout(() => {
      document.body.removeChild(this.game.gameMenu)
      this.game.gameMenu = undefined
      this.initGameIcon()
    }, 300);
  }

  startGame () {
    this.sky.initSpaceShip()
    this.sky.drawSpaceShip()

    this.sky.canvas.addEventListener('mousemove', ent => {
      this.sky.moveSpaceShip(ent.x, ent.y)
      this.sky.redraw()
    })
  }
}
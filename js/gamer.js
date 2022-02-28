export default class gamer {
  constructor () {
    this.interface
    this.initIcon

    this.gameMenu
    this.playButton
    this.optButton
    this.quitButton
  }

  async setInitIcon () {
    let container, playIcon, iconPath

    iconPath = '../icons/play.png'
    playIcon = document.createElement('img')
    playIcon.src = iconPath
    playIcon.classList.add('gInit__icon')

    container = document.createElement('div')
    container.classList.add('gInit')
    container.append(playIcon)

    this.initIcon = container
    this.showInitIcon()
  }


  showInitIcon () {
    document.body.append(this.initIcon)

    setTimeout(() => {
      this.initIcon.classList.add('gInit_active')
    }, 100)
  }


  hideInitIcon () {
    this.initIcon.classList.remove('gInit_active')

    setTimeout(() => {
      document.body.removeChild(this.initIcon)
    }, 100)
  }


  initGameMenu () {
    let container, playButton, optButton,
    quitButton

    playButton = document.createElement('li')
    playButton.classList.add('gMenu__button')
    playButton.innerText = 'PLAY'

    optButton = playButton.cloneNode()
    optButton.innerText = 'OPTIONS'

    quitButton = playButton.cloneNode()
    quitButton.innerText = 'QUIT'

    container = document.createElement('ul')
    container.classList.add('gMenu')

    container.append(playButton)
    container.append(optButton)
    container.append(quitButton)

    this.gameMenu = container
    this.playButton = playButton
    this.optButton = optButton
    this.quitButton = quitButton

    this.gameMenu = container
  }

  showGameMenu () {
    document.body.append(this.gameMenu)

    setTimeout(() => {
      this.gameMenu.classList.add('gMenu_active')
    }, 100)
  }


  hideGameMenu () {
    this.gameMenu.classList.remove('gMenu_active')

    setTimeout(() => {
      document.body.removeChild(this.gameMenu)
    }, 100)
  }

  checkCollision (x, y, star) {
    let checkX, checkY, collisionCheck,
    start, end

    start = star.hitBox.startPoint
    end = star.hitBox.endPoint
    
    checkX = x > start.x && x < end.x
    checkY = y > start.y && y < end.y
    collisionCheck = checkX && checkY
    return collisionCheck
  }
}
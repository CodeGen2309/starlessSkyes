export default class gamer {
  constructor (sky) {
    this.interface
    this.initIcon

    this.gameMenu
    this.playButton
    this.optButton
    this.quitButton
  }

  setStartIcon () {
    let container, playIcon, iconPath

    iconPath = '../icons/play.png'
    playIcon = document.createElement('img')
    playIcon.src = iconPath
    playIcon.classList.add('gInit__icon')

    container = document.createElement('div')
    container.classList.add('gInit')
    container.append(playIcon)

    document.body.append(container)
    this.initIcon = container
  }

  initInterface () {
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

    document.body.append(container)
    setTimeout(() => {
      this.gameMenu.classList.add('gMenu_active')
    }, 100);

    this.gameMenu = container
  }
}
export default class gamer {
  constructor () {
    this.interface = null
    this.initIcon = null
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

    container.addEventListener('click', () => {
      container.classList.add('gInit_incative')
      this.interface = this.initInterface()
      
      setTimeout(() => {
      this.interface.classList.add('gMenu_active')
        document.body.removeChild(container)
      }, 300)
    })

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
    quitButton.addEventListener('click', () => this.detachInterface())

    container = document.createElement('ul')
    container.classList.add('gMenu')

    container.append(playButton)
    container.append(optButton)
    container.append(quitButton)

    document.body.append(container)
    return container
  }

  detachInterface () {
    this.setStartIcon()
    this.interface.classList.remove('gMenu_active')
    
    setTimeout(() => {
      document.body.removeChild(this.interface)
    }, 300)
  }
}
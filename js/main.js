import Manager from './manager.js'

let manager = new Manager ()

manager.setComposition()
manager.animateSkyes()
manager.initGameInterfase()

window.addEventListener('resize', () => {
  manager.sky.resizeCanvas()
})
export default class spaceShip {
  constructor (x, y) {
    let imgPath, imgItem

    imgPath = '/sprites/spaceShip250.png'
    imgItem = document.createElement('img')
    imgItem.src = imgPath

    this.img = imgItem
    this.isVisible = false
    this.x = x
    this.y = y

    this.hitbox = {
      startPoint: [x - 25, y - 25],
      endPoint: [x + 25, y + 25]
    }
  }

  move (x, y) {
    this.x = x
    this.y = y

    this.reCalcHitBox()
  }

  reCalcHitBox () {
    this.hitbox.startPoint = [this.x - 25, this.y - 25]
    this.hitbox.endPoint = [this.x + 25, this.y + 25]
  }
}
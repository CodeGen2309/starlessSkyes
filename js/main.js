import compositor from './compositor.js'
import animator from './animator.js'

let sky, anim, skyColors
skyColors = [
  '#0f0c29', '#0f0c29', '#302b63',
  '#0f0c29', '#000000',
]


sky = new compositor('.app', skyColors)
sky.fillSky(skyColors)
sky.lightUpTheStars(100)

anim = new animator(sky)
anim.moveAnimation()
anim.shineAnimation(5, 0.3)
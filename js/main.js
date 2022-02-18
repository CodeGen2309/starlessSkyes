import compositor from './compositor.js'

let sky, skyColors

skyColors = [
  '#0f0c29', '#0f0c29', '#302b63',
  '#0f0c29', '#000000',
]

sky = new compositor('.app', skyColors)
sky.fillSky(skyColors)
sky.lightUpTheStars(100)
sky.moveAnimation()
import * as fs from 'fs'
import { createCanvas, loadImage } from 'canvas'
// import * as Image from 'pureimage'
import { colord } from 'colord'

import * as hash from './benchmarks/hashing.js'


const fns = [
  // hash.murmur2,
  // hash.fnv1a,
  // hash.djb2a,
  // hash.goober_unmodified,
  hash.xxh,
]

fns.forEach(fn => {
  console.log('Running ' + fn.name)

  const resolution = 64

  const width  = 0x10000 / resolution
  const height = 0x10000 / resolution

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  const image = ctx.getImageData(0, 0, width, height)

  for (let i = 0; i < (0x100000000 / 0x100); i++) {
    const hash = parseInt(fn(String(i)), 36)
    const index = Math.floor(hash / resolution)

    const row = Math.floor(index / width)
    const hue = row / height * 360
    const color = colord(`hsl(${hue}, 100%, 50%)`)

    image.data[index * 4 + 0] = color.rgba.r
    image.data[index * 4 + 1] = color.rgba.g
    image.data[index * 4 + 2] = color.rgba.b
    image.data[index * 4 + 3] = 255
  }

  ctx.putImageData(image, 0, 0)

  canvas.createPNGStream().pipe(
    fs.createWriteStream(import.meta.dirname + `/${fn.name}.png`))
})

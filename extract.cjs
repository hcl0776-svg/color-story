const fs = require('fs');
const PNG = require('pngjs').PNG;

const files = [
  '617 carmine.png',
  '614 vermilion.png',
  '610 perma orange.png',
  '604 perma yellow middle.png',
  '638 sap green.png',
  '640 aqua green.png',
  '643 Cobalt Blue.png',
  '644 Ultramarine.png',
  '649 Violet.png',
  '618 Magenta.png',
  '621 Burnt Sienna.png',
  '660 Black.png'
];

files.forEach(file => {
  try {
    const data = fs.readFileSync('./public/' + file);
    const png = PNG.sync.read(data);
    const centerX = Math.floor(png.width / 2);
    const centerY = Math.floor(png.height / 2);
    const idx = (png.width * centerY + centerX) << 2;
    const r = png.data[idx];
    const g = png.data[idx+1];
    const b = png.data[idx+2];
    const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    console.log(file + ': ' + hex);
  } catch (e) {
    console.error('Error reading ' + file + ': ' + e.message);
  }
});

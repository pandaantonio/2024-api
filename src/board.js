const { Router } = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Registre a fonte instalada
registerFont(path.join(__dirname, '..', 'node_modules', '@fontsource', 'roboto', 'files', 'roboto-latin-400-normal.woff'), { family: 'Roboto' });

const router = Router();

const tileColors = {
  0: '#cdc1b4',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
  4096: '#3c3a32',
  8192: '#3c3a32',
};

router.get('/', async (req, res) => {
  const boardSize = 4;
  const tileSize = 100;
  const padding = 10;
  const width = boardSize * (tileSize + padding) + padding;
  const height = boardSize * (tileSize + padding) + padding;

  const bgColor = '#bbada0';
  const textColor = '#776e65';

  const board = req.query.board ? req.query.board.split('|').map(row => row.split(',').map(Number)) :
    Array(boardSize).fill().map(() => Array(boardSize).fill(0));

  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      const x1 = padding + x * (tileSize + padding);
      const y1 = padding + y * (tileSize + padding);
      const color = tileColors[value] || '#3c3a32'; // Pega a cor do valor ou usa a cor padrão
      context.fillStyle = color;
      context.fillRect(x1, y1, tileSize, tileSize);
      if (value) {
        context.fillStyle = textColor;
        context.font = '40px Roboto';
        const textSize = context.measureText(value);
        context.fillText(value, x1 + (tileSize - textSize.width) / 2, y1 + (tileSize + 30) / 2);
      }
    });
  });

  res.set('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
});

module.exports = router;
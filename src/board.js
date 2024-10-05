const express = require("express");
const { join } = require("path");
const { createCanvas, registerFont } = require("canvas");

registerFont(join(__dirname, "fonts", "./fonts/Arial.ttf"), { family: "Arial" });

const router = express.Router();

const tileColors = {
  0: "#e0e0e0",
  2: "#fafafa",
  4: "#e0f7fa",
  8: "#b2ebf2",
  16: "#80deea",
  32: "#4dd0e1",
  64: "#26c6da",
  128: "#00bcd4",
  256: "#00acc1",
  512: "#0097a7",
  1024: "#00838f",
  2048: "#006064",
  4096: "#ff80ab",
  8192: "#ff4081",
};

const textColor = {
  0: "#9e9e9e",
  2: "#9e9e9e",
  4: "#9e9e9e",
  8: "#ffffff",
  16: "#ffffff",
  32: "#ffffff",
  64: "#ffffff",
  128: "#ffffff",
  256: "#ffffff",
  512: "#ffffff",
  1024: "#ffffff",
  2048: "#ffffff",
  4096: "#ffffff",
  8192: "#ffffff",
};

router.get("/", async (req, res) => {
  const boardSize = 4;
  const tileSize = 100;
  const padding = 10;
  const width = boardSize * (tileSize + padding) + padding;
  const height = boardSize * (tileSize + padding) + padding;

  const bgColor = "#bbada0";

  const board = req.query.board
    ? req.query.board.split("|").map((row) => row.split(",").map(Number))
    : Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(0));

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = bgColor;
  context.fillRect(0, 0, width, height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      const x1 = padding + x * (tileSize + padding);
      const y1 = padding + y * (tileSize + padding);
      const color = tileColors[value] || "#3c3a32";
      context.fillStyle = color;
      context.fillRect(x1, y1, tileSize, tileSize);
      if (value) {
        context.fillStyle = textColor[value] || "#ffffff";
        context.font = "40px Arial"; // Use a fonte Arial, que está disponível na maioria dos sistemas
        const textSize = context.measureText(value.toString());
        context.fillText(
          value.toString(),
          x1 + (tileSize - textSize.width) / 2,
          y1 + (tileSize + 30) / 2
        );
      }
    });
  });

  res.set("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
});

module.exports = router;

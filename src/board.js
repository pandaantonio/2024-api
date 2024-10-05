const { Router } = require("express");
const { createCanvas, registerFont } = require("canvas");
const path = require("path");

// Registra a fonte
registerFont(
  path.join(
    __dirname,
    "..",
    "node_modules",
    "@fontsource",
    "roboto",
    "files",
    "roboto-latin-400-normal.woff"
  ),
  { family: "Roboto" }
);

const router = Router();

const tileColors = {
  0: "#CDC1B4",
  2: "#E5F5E0",
  4: "#CCFFCC",
  8: "#99FF99",
  16: "#66FF66",
  32: "#33FF33",
  64: "#00FF00",
  128: "#00CC00",
  256: "#009900",
  512: "#006600",
  1024: "#003300",
  2048: "#FF33CC",
  4096: "#FF66CC",
  8192: "#FF99CC",
};

const textColor = {
  0: "#776E65",
  2: "#776E65",
  4: "#776E65",
  8: "#FFFFFF",
  16: "#FFFFFF",
  32: "#FFFFFF",
  64: "#FFFFFF",
  128: "#FFFFFF",
  256: "#FFFFFF",
  512: "#FFFFFF",
  1024: "#FFFFFF",
  2048: "#FFFFFF",
  4096: "#FFFFFF",
  8192: "#FFFFFF",
};

router.get("/", async (req, res) => {
  const boardSize = 4;
  const tileSize = 100;
  const padding = 10;
  const width = boardSize * (tileSize + padding) + padding;
  const height = boardSize * (tileSize + padding) + padding;

  const bgColor = "#BBADA0";

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
        context.fillStyle = textColor[value] || "#FFFFFF";
        context.font = "40px Roboto";
        const textSize = context.measureText(value);
        context.fillText(
          value,
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

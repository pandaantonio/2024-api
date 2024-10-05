const express = require("express");
const boardRoutes = require("./board");

const app = express();
const PORT = process.env.PORT || 3000;

app.user("/", (req, res) => {
  res.send(200);
});
app.use("/api/board", boardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

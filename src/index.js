const express = require('express');
const boardRoutes = require('./routes/board');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/board', boardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
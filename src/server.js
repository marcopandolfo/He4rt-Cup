const app = require('./config/custom-express');

// Port
const port = process.env.PORT || 3000;

// Auto create mysql tables
const connection = app.infra.connectionFactory();
app.infra.createTables(connection);

app.listen(3000, () => {
  console.log(`> Servidor rodando na porta [${port}]`);
});

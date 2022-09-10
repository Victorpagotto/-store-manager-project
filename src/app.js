const { json } = require('body-parser');
const express = require('express');
const productsRouter = require('./middlewares/routers/products.router');
const validateDB = require('./db/db.validate');

const app = express();
validateDB().then((res) => console.log(res));

app.use(json());
app.use('/products', productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicação 
module.exports = app;
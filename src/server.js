
require('./database/database');

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const pokemonRouter = require('./routes/pokemonRouter');
const tradeRouter = require('./routes/tradeRouter');

app.use('/pokemon', pokemonRouter);
app.use('/trade', tradeRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if(server) {
    console.log(`Server is running in http://localhost:${PORT}`)
  } else {
    console.log(`Failure`)
  }
})

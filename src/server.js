require('./database/database');
const config = require('./config/config');

const cors = require("cors");
const logger = require('morgan');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI

const app = express();
app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    const protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

const pokemonRouter = require('./routes/pokemonRouter');
const tradeRouter = require('./routes/tradeRouter');

app.use('/pokemon', pokemonRouter);
app.use('/trade', tradeRouter);

const server = app.listen(process.env.LISTEN_PORT, () => {
  if(server) {
    console.log(`Server is running in http://localhost:${process.env.LISTEN_PORT}`)
  } else {
    console.log(`Failure`)
  }
})

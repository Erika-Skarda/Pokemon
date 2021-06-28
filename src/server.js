require('./database/database');
const config = require('./config/config');

const cors = require("cors");
const logger = require('morgan');
const express = require('express');

const uri = process.env.MONGODB_URI

// const { MongoClient } = require('mongodb');
// const uri =  process.env.MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("PokemonDB").collection("trades");
//   // perform actions on the collection object
//   client.close();
// });


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

const PORT = config.MONGODB_URI
const server = app.listen(PORT, () => {
  if(server) {
    console.log(`Server is running in http://localhost:${PORT}`)
  } else {
    console.log(`Failure`)
  }
})

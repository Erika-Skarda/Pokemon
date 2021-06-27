const { toArray } = require('lodash');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const pokemonSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
  },
  base_experience: {
    type: Number
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  sprites: {
    type: Object,
  },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
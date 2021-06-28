const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradeModel = new Schema({
  // first_player: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Player',
  // },
  // second_player: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Player',
  // },
  pokemons_first_player: {
    type: Array,
    validate: [arrayLimit, '{PATH} exceeds the limit of 6']
  },
  pokemons_second_player:  {
    type: Array,
    validate: [arrayLimit, '{PATH} exceeds the limit of 6']
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Trade', tradeModel);
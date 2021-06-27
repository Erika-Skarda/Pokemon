const _ = require('lodash');
const axios = require('axios');
const createError = require("http-errors");

const TradeModel = require('../models/trade.model');
const PokemonModel = require('../models/pokemon.model');

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

exports.createTrade = async function (req, res) {
  // first_player,
  // second_player,
  // pokemons_first_player,
  // pokemons_second_player
  const tradeObject = await req.body;
  const newTrade = new TradeModel(tradeObject);
  
  let xp_first_player = 0;
  let xp_second_player = 0;
  
  const length_1 = tradeObject.pokemons_first_player.length;
  const length_2 = tradeObject.pokemons_second_player.length;
  
  for (const each_pokemon in tradeObject.pokemons_first_player) {
    let name = tradeObject.pokemons_first_player[each_pokemon].name
    let url = `${baseUrl}/${name}/`
    await axios.get(url)
    .then(response => {
      console.log(response.data.base_experience)
      xp_first_player += tradeObject.pokemons_first_player[each_pokemon].base_experience
    })
    .catch(err => {
       throw createError(400, err.message );
    })
  };
  
  for (const each_pokemon in tradeObject.pokemons_second_player) {
    let name = tradeObject.pokemons_second_player[each_pokemon].name
    let url = `${baseUrl}/${name}/`
    await axios.get(url)
    .then(response => {
      console.log(response.data.base_experience)
      xp_second_player += tradeObject.pokemons_second_player[each_pokemon].base_experience
    })
    .catch(err => {
       throw createError(400, err.message );
    })
  };
  
  let total_xp = Math.abs(xp_second_player - xp_first_player);
  
  if(total_xp > 10) {
    res.status(400).send({ message: `It is not a fair trade (￣ー￣)` });
  };

  if(length_1 > 5 || length_2 > 5 ) {
    res.status(400).send({ message: `You can only choose up to six pokemons >(Ф^三^Ф)<` });
  };

  await newTrade.save((err, savedTrade) => {
    if(err) {
      throw createError(400, err.message);
    }
    res.status(201).send({ message: `Poke trades ${savedTrade} successfully ϞϞ(๑⚈ ․̫ ⚈๑) ` });
  });
};

exports.getTradeById = async function (req, res) {
  const { id } = req.params;
  let response = await TradeModel.findById(id) 
    try {
      res.status(200).send({ Trade: response })
    } catch(err) {
      throw createError(400, err.message );
    }
};

exports.getTrades = async function (req, res) {
  let response = await TradeModel.find({})
    try {
      res.status(200).send({ Trades: response})
    } catch(err) {
      throw createError(400, err.message );
    }
};

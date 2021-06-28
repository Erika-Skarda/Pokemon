const _ = require('lodash');
const axios = require('axios');
const createError = require("http-errors");

const PokemonModel = require('../models/pokemon.model');

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

exports.getPokemonById = async function (req, res) {
  const { id } = req.params;
  let url = `${baseUrl}/${id}/`
  await axios.get(url)
  .then(response => {
    let data = response.data;
    return res.status(200).send({ 
      id: data.id, 
      name: data.name,
      base_experience: data.base_experience, 
      weight: data.weight,
      height: data.height,
      sprites: data.sprites,
      // type: data.types
    })
  })
  .catch(err => {
     throw createError(400, err.message );
  })
};

exports.getPokemonByName = async function (req, res) {
  const { name } = req.params;
  let url = `${baseUrl}/${name}/`
  await axios.get(url)
  .then(response => {
    let data = response.data;
    return res.status(200).send({ 
      id: data.id, 
      name: data.name,
      base_experience: data.base_experience, 
      weight: data.weight,
      height: data.height,
      sprites: data.sprites,
      type: data.types
    })
  })
  .catch(err => {
     throw createError(400, err.message);
  })
};

exports.getPokemons = async function (req, res) {
  let pokemons;
  let url = `${baseUrl}/`
  let info = []
  try {
    const response = await axios.get(url)
    pokemons = (response.data.results);

    for(const pokemon in pokemons) {
      console.log("POKE", pokemons[pokemon].name)
      const result = await axios.get(`${baseUrl}/${pokemons[pokemon].name}`)
        let obj = {
          name: (result.data.name),
          weight: (result.data.weight),
          height: (result.data.height),
          base_experience: (result.data.base_experience),
          images: (result.data.sprites),
        }
        info.push(obj)
    }
    res.status(200).send({Pokemons: info})
  } catch (err) {
    console.log('fetch failed', err);
  }
};





const pokemonRouter = require('express').Router();

const pokemonController = require('../controllers/pokemonController');

pokemonRouter.get('/:id', pokemonController.getPokemonById);
pokemonRouter.get('/:name', pokemonController.getPokemonByName);
pokemonRouter.get('', pokemonController.getPokemons);

module.exports = pokemonRouter;
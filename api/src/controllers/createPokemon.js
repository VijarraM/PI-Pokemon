const { Pokemon, Type } = require('../db');

const createPokemon = async (pokemon) => {
  console.log(pokemon.types);
  const newPokemon = await Pokemon.create(pokemon);

  const types = await Type.findAll({
    where: {
      name: pokemon.types,
    },
  });
  await newPokemon.setTypes(types);
  return newPokemon;
};

module.exports = createPokemon;

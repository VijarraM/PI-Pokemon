const { Pokemon, Type } = require('../db');

const findPokemonDbById = async (id) => {
  console.log(id);
  const pokemon = await Pokemon.findByPk(id, {
    include: [
      { model: Type, attributes: ['name'], through: { attributes: [] } },
    ],
  });
  if (!pokemon) return null;
  return pokemon;
};

module.exports = findPokemonDbById;

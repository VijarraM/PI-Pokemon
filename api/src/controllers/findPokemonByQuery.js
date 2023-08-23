const axios = require('axios');
const { Pokemon } = require('../db');

const findPokemonByQuery = async (name) => {
  try {
    const nameLower = name.toLowerCase();

    const pokemonsFromDB = await Pokemon.findAll({
      where: {
        name: nameLower,
      },
    });

    //la db arroja un array vació cuando no encuentra registro, entonces procedemos a buscar en la api
    if (pokemonsFromDB.length === 0) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nameLower}`;
      const res = await axios.get(apiUrl);

      const pokemonFromAPI = {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.other.dream_world.front_default,
        hp: res.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: res.data.stats.find((stat) => stat.stat.name === 'attack')
          .base_stat,
        defense: res.data.stats.find((stat) => stat.stat.name === 'defense')
          .base_stat,
        speed: res.data.stats.find((stat) => stat.stat.name === 'speed')
          .base_stat,
        height: res.data.height,
        weight: res.data.weight,
        Types: res.data.types.map((pokemon) => {
          return {
            name: pokemon.type.name,
          };
        }),
      };

      return pokemonFromAPI;
    }
    if (pokemonsFromDB) {
      return pokemonsFromDB[0];
    }
  } catch (error) {
    return null;
  }
};

module.exports = findPokemonByQuery;

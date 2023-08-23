const axios = require('axios');

const findPokemonById = async (id) => {
  try {
    const URLAPI = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await axios.get(URLAPI);
    const pokemon = {
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
      // traer los typos a los que esta asociado!!
    };

    return pokemon;
  } catch (error) {
    return null;
  }
};
module.exports = findPokemonById;

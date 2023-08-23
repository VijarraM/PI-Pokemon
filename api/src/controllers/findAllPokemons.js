const axios = require('axios');
const { Pokemon, Type } = require('../db');

const findAllPokemons = async () => {
  const URLAPI = 'https://pokeapi.co/api/v2/pokemon?limit=120';
  const res = await axios.get(URLAPI);
  const pokemons = res.data.results;

  const detailedPokemons = await Promise.all(
    pokemons.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.other.dream_world.front_default,
        hp: detailResponse.data.stats.find((stat) => stat.stat.name === 'hp')
          .base_stat,
        attack: detailResponse.data.stats.find(
          (stat) => stat.stat.name === 'attack'
        ).base_stat,
        defense: detailResponse.data.stats.find(
          (stat) => stat.stat.name === 'defense'
        ).base_stat,
        speed: detailResponse.data.stats.find(
          (stat) => stat.stat.name === 'speed'
        ).base_stat,
        height: detailResponse.data.height,
        weight: detailResponse.data.weight,
        Types: detailResponse.data.types.map((pokemon) => {
          return {
            name: pokemon.type.name,
          };
        }),
      };
    })
  );

  const pokemonsDb = await Pokemon.findAll({
    include: [
      { model: Type, attributes: ['name'], through: { attributes: [] } },
    ],
  });
  console.log(pokemonsDb);
  return pokemonsDb.concat(detailedPokemons);
};

module.exports = findAllPokemons;

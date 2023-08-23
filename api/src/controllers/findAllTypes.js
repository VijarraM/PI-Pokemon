const axios = require('axios');
const { Type } = require('../db.js');

const findAllTypes = async () => {
  const typesDB = await Type.findAll();

  if (typesDB.length > 0) {
    return typesDB;
  } else {
    const URLAPI = 'https://pokeapi.co/api/v2/type';
    const res = await axios.get(URLAPI);
    const typesAPI = await res.data.results.map((type) => ({
      name: type.name,
    }));
    await Type.bulkCreate(typesAPI);

    return typesAPI;
  }
};

module.exports = findAllTypes;

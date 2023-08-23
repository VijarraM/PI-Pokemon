const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const findAllPokemons = require('./controllers/findAllPokemons.js');
// const findPokemonById = require('./controllers/findPokemonById.js');
const findPokemonByQuery = require('./controllers/findPokemonByQuery.js');
const createPokemon = require('./controllers/createPokemon.js');
const findAllTypes = require('./controllers/findAllTypes.js');
const findPokemonDbById = require('./controllers/findPokemonDbById.js');
const findPokemonById = require('./controllers/findPokemonById.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// ruta para traer todos lo pokemon
server.get('/pokemon', async (req, res) => {
  try {
    const pokemons = await findAllPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ruta para traer el pokemon solicitado por id
server.get('/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let pokemon = null;
    const regexExpUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (regexExpUUID.test(id)) {
      pokemon = await findPokemonDbById(id);
    } else {
      pokemon = await findPokemonById(id);
    }
    if (!pokemon) {
      res.status(404).send('Pokemon no encontrado');
    }
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ruta para realizar búsqueda por Nombre
server.get('/pokemons/name', async (req, res) => {
  try {
    const name = req.query.input;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'Es necesario un nombre para buscar Pokemons.' });
    }

    const pokemon = await findPokemonByQuery(name);

    if (!pokemon) {
      return res.status(404).json({
        message: 'No se encontraron Pokemons con el nombre especificado.',
      });
    }
    // console.log(pokemon);
    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Error al buscar Pokemons.',
    });
  }
});

// ruta para crear pokemon
server.post('/pokemon', async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;
    const newPokemon = await createPokemon({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    });
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ruta types
server.get('/types', async (req, res) => {
  try {
    const types = await findAllTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

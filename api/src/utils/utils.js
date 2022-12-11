const axios = require("axios");
const { Pokemon, Type } = require("../db");
let newAxios = axios.create({
  headers: {
    "Accept-Encoding": "null",
  },
});

async function getApiPokemons() {
  let pokemonsApi = [];

  await newAxios
    .get("https://pokeapi.co/api/v2/pokemon?limit=60")
    .then(async (response) => {
      let arrResults = response.data.results;
      let arrPromises = [];
      arrResults.map((p) => arrPromises.push(newAxios.get(p.url)));

      await Promise.all(arrPromises)
        .then((pokemons) => {
          pokemonsApi = pokemons.map((p) => {
            return {
              id: p.data.id,
              name: p.data.name,
              image: p.data.sprites.other.dream_world.front_default,
              hp: p.data.stats[0].base_stat,
              attack: p.data.stats[1].base_stat,
              defense: p.data.stats[2].base_stat,
              speed: p.data.stats[5].base_stat,
              height: p.data.height,
              weight: p.data.weight,
              type: p.data.types.map((t) => {
                return {
                  name: t.type.name,
                };
              }),
            };
          });
        })
        .catch((error) => {
          return error;
        });
    })
    .catch((error) => {
      return error;
    });
  return pokemonsApi;
}

async function getDbPokemons() {
  try {
    const arrDbPokemons = await Pokemon.findAll({
      include: {
        attributes: ["name"],
        model: Type,
        through: {
          attributes: [],
        },
      },
    });
    return arrDbPokemons;
  } catch (error) {
    return error;
  }
}

async function getAllPokemon() {
  try {
    let apiPokemons = await getApiPokemons();
    let dbPokemons = await getDbPokemons();
    return apiPokemons.concat(dbPokemons);
  } catch (error) {}
}

async function getApiPokemonById(pokeId) {
  try {
    let pokeResult = await newAxios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    );
    if (pokeResult) {
      let p = pokeResult;

      return {
        id: p.data.id,
        name: p.data.name,
        image: p.data.sprites.other.dream_world.front_default,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        types: p.data.types.map((t) => {
          return { name: t.type.name };
        }),
      };
    } else {
      return null;
    }
  } catch (error) {
    return { msg: "Falló la petición" };
  }
}

async function getPokemonDbById(paramId) {
  try {
    const idResult = await Pokemon.findOne({
      where: {
        id: paramId,
      },
      include: {
        attributes: ["name"],
        model: Type,
      },
    });
    return idResult;
  } catch (error) {
    return { msg: "Falló la petición a la Base de Datos" };
  }
}

async function getApiPokemonByName(queryName) {
  try {
    let pokeResult = await newAxios.get(
      `https://pokeapi.co/api/v2/pokemon/${queryName}`
    );
    if (pokeResult) {
      let p = pokeResult;

      return {
        id: p.data.id,
        name: p.data.name,
        image: p.data.sprites.other.dream_world.front_default,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        types: p.data.types.map((t) => {
          return { name: t.type.name };
        }),
      };
    } else {
      return null;
    }
  } catch (error) {
    return { msg: "Falló la petición" };
  }
}

async function getDbPokemonByName(queryName) {
  try {
    const nameResult = await Pokemon.findOne({
      where: {
        name: queryName,
      },
      include: {
        attributes: ["name"],
        model: Type,
      },
    });
    return nameResult;
  } catch (error) {
    return { msg: "Falló la petición a la Base de Datos" };
  }
}

async function getTypes() {
  const typesDb = await Type.findAll({
    attributes: ["name"]
  });

  if (typesDb.length) {
    return typesDb;
  }

  const typesResults = await newAxios("https://pokeapi.co/api/v2/type");
  const types = typesResults.data.results.map((t) => ({name: t.name}))

  Type.bulkCreate(types)
  return types
}

module.exports = {
  getApiPokemons,
  getDbPokemons,
  getAllPokemon,
  getApiPokemonById,
  getPokemonDbById,
  getApiPokemonByName,
  getDbPokemonByName,
  getTypes,
};

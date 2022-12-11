const { Router, query } = require("express");
const {
  getApiPokemons,
  getDbPokemons,
  getAllPokemon,
  getApiPokemonById,
  getPokemonDbById,
  getApiPokemonByName,
  getDbPokemonByName
} = require("../utils/utils");
const { Pokemon, Type } = require("../db");

const PokemonsRouter = Router();

PokemonsRouter.get('/', async(req,res)=>{
  
  let queryName = req.query.name

  if(queryName){
    queryName = queryName.toLocaleLowerCase()
    
    let pokeResult = await getApiPokemonByName(queryName)
  
  if(pokeResult.msg){
    pokeResult = await getDbPokemonByName(queryName)
    
    if(pokeResult === null || pokeResult.msg === "Name not Found"){
      res.status(404).send({error: "Pokemon Not Found"})
    }else {
      res.send(pokeResult)
    }
  }else{
    res.send(pokeResult)
  }
  }
  else{
    try {
      let allPokemons = await getAllPokemon();
      res.send(allPokemons);
    } catch (error) {
      res.send({ error: error.message });
    }
  }
  
})

PokemonsRouter.get("/api", async (req, res) => {
  try {
    let apiPokemons = await getApiPokemons();
    res.send(apiPokemons);
  } catch (error) {
    res.send({ error: error.message });
  }
});

PokemonsRouter.get("/db", async (req, res) => {
  try {
    let apiPokemons = await getDbPokemons();
    res.send(apiPokemons);
  } catch (error) {
    res.send({ error: error.message });
  }
});

PokemonsRouter.get("/:pokeId", async (req, res) => {
  const { pokeId } = req.params;
  let pokeResult = await getApiPokemonById(pokeId);

  if (pokeResult.msg) {
    pokeResult = await getPokemonDbById(pokeId);
    if (pokeResult.msg === "Falló la petición a la Base de Datos") {
      res.status(404).send({ msg: "ID NOT FOUND" });
    } else {
      res.send(pokeResult);
    }
  } else {
    res.send(pokeResult);
  }
});

PokemonsRouter.post("/", async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, types } =
      req.body;

    if (
      !name ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types.length
    ) {
      return res.status(404).send({ error: "All fields are required" });
    }
    const newPokemon = await Pokemon.create({
      name: name.toLocaleLowerCase(),
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      speed: parseInt(speed),
      height: parseInt(height),
      weight: parseInt(weight),
    });
    const typesDb = await Type.findAll({ where: { name: types } });
    newPokemon.addTypes(typesDb);
    res.send(newPokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = PokemonsRouter;

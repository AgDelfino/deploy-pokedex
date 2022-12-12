import axios from "axios";

export function filterPokemons(pokemons, { typeFilter }) {
  if (!typeFilter[0] && !typeFilter[1]) {
    return [...pokemons];
  }

 
  if (typeFilter[0] && typeFilter[1]) {
    const sortedFilters = typeFilter.sort();
    const filteredPokemons = pokemons.filter((pokemon) => {
      let sortedType = pokemon.type?.map((t) => t.name).sort();
      if (!sortedType) {
        sortedType = pokemon.types?.map((t) => t.name).sort();
      }

      if (
        sortedFilters[0] === sortedType[0] &&
        sortedFilters[1] === sortedType[1]
      ) {
        return pokemon;
      }
    });
    if (!filteredPokemons.length) {
      throw { error: "FILTERS DIDN'T MATCH ANY RESULTS " };
    }
    return filteredPokemons;
  }
  if (typeFilter[0] && !typeFilter[1]) {
    const filteredPokemons = pokemons.filter((pokemon) => {
      const hasFilterType = pokemon.type?.find((t) => t.name === typeFilter[0]) && pokemon.type.length === 1;
      const hasFilterTypes = pokemon.types?.find(
        (t) => t.name === typeFilter[0]
      ) && pokemon.types.length === 1

      if (hasFilterType || hasFilterTypes) {
        return pokemon;
      }
    });
    if (!filteredPokemons.length) {
      throw { error: "FILTERS DIDN'T MATCH ANY RESULTS " };
    }
    return filteredPokemons;
  }

  if (!typeFilter[0] && typeFilter[1]) {
    const filteredPokemons = pokemons.filter((pokemon) => {
      const hasFilterType = pokemon.type?.find((t) => t.name === typeFilter[1]);
      const hasFilterTypes = pokemon.types?.find(
        (t) => t.name === typeFilter[1]
      );

      if (hasFilterType || hasFilterTypes) {
        return pokemon;
      }
    });
    if (!filteredPokemons.length) {
      throw { error: "FILTERS DIDN'T MATCH ANY RESULTS " };
    }
    return filteredPokemons;
  }
}

export function sortPokemons(pokemons, { sortFilter }) {
  if (sortFilter === "A-Z") {
    return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortFilter === "Z-A") {
    return [...pokemons].sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortFilter === "ATK+") {
    return [...pokemons].sort((a, b) => a.attack - b.attack);
  }
  if (sortFilter === "ATK-") {
    return [...pokemons].sort((a, b) => b.attack - a.attack);
  }
}

export function filterPokemonsApiOrDb(pokemons, { filterApiOrDb }) {
  let newPokemons = [...pokemons];
  if (filterApiOrDb === "DB") {
    newPokemons = newPokemons.filter((poke) => isNaN(poke.id));
  }
  if (filterApiOrDb === "API") {
    newPokemons = newPokemons.filter((poke) => !isNaN(poke.id));
  }
  // if(filterApiOrDb === 'ALL'){

  // }
  if (!newPokemons.length) {
    throw { error: "DATABASE IS EMPTY!" };
  }
  return newPokemons;
}

export function validateForm(input, globalPokemons) {
  if (input.name > 20) {
    throw "Max characters exceeded";
  }

  if (
    globalPokemons.find(
      (e) => e.name.toLowerCase() === input.name.toLowerCase()
    )
  ) {
    throw "POKEMON ALREADY EXIST'S";
  }

  const numValues = Object.values(input).slice(1, -1);
  if (
    !numValues.every((value) => value < 1000 && value != 0 && !isNaN(value))
  ) {
    throw "INVALID VALUES";
  }

  return "POKEMON CREATED";
}

export async function sendForm(input) {
  await axios.post("/pokemons", input);
}

export function formErrors(input, globalPokemons) {
  let copyError = {};

  if (!input.name) copyError.name = "Must provide a name";
  else if (/[^A-Za-z ]+/g.test(input.name))
    copyError.name = "Name must have only letters";
  else if (
    globalPokemons.find((pokemon) => {
      return pokemon.name.toLowerCase() === input.name.toLowerCase();
    })
  )
    copyError.name = "This pokemon already exists";

  if (!input.attack) copyError.attack = "Must set Attack (1 to 999)";
  else if (input.attack < 1 || input.attack > 999)
    copyError.attack = "Select between 1 and 999";

  if (!input.defense) copyError.defense = "Must set Defense (1 to 999)";
  else if (input.defense < 1 || input.defense > 999)
    copyError.defense = "Select between 1 and 999";

  if (!input.hp) copyError.hp = "Must set HP (1 to 999)";
  else if (input.hp < 1 || input.hp > 999)
    copyError.hp = "Select between 1 and 999";

  if (!input.speed) copyError.speed = "Must set a Speed (1 to 999)";
  else if (input.speed < 1 || input.speed > 999)
    copyError.speed = "Select between 1 and 999";

  if (!input.height) copyError.height = "Must set a Height (1 to 10)";
  else if (input.height < 1 || input.height > 10)
    copyError.height = "Select between 1 and 10";

  if (!input.weight) copyError.weight = "Must set a Weight (1 to 500)";
  else if (input.weight < 1 || input.weight > 500)
    copyError.weight = "Select between 1 and 500";

  return copyError;
}

import {
  GET_ALL_POKEMONS,
  SEARCH_ERROR,
  GET_ALL_TYPES,
  SEARCH_POKEMON,
  RESET_POKEMONS,
  FILTER_ERROR,
  GET_POKEMONS_DETAILS,
  RESET_DETAILS,
} from "./actions";


const initialState = {
  pokemons: [],
  pokemonDetails: '',
  types: [],
//-----ERRORS----///
  searchError: {},
  filterError: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        searchError: {},
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_POKEMONS_DETAILS: 
      return {
        ...state,
        pokemonDetails: action.payload
      }
    case SEARCH_POKEMON:
      return {
        ...state,
        pokemons: [action.payload],
        searchError: {},
      };
    case SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload,
      };
    case RESET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        searchError: {}
      };
    case FILTER_ERROR:
      return {
        ...state,
        filterError: action.payload
      }
    case RESET_DETAILS:
      return {
        ...state,
        pokemonDetails: ''
      }
    default:
      return { ...state };
  }
}

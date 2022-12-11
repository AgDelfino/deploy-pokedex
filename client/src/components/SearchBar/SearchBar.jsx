import React from "react";
import styles from "../SearchBar/SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPokemons, searchPokemon } from "../../Redux/actions";

const SearchBar = ({ paginator }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if(search.length){
        dispatch(resetPokemons());
        dispatch(searchPokemon(search));
        paginator(1);
        setSearch("");
        e.target.reset()
    }
  };

  const searchButtonHandler = (e) => {
    if (!search) throw alert("OOPS! Nothing to search");
  };

  return (
    <form className={styles.form_container} onSubmit={handlerSubmit}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search your pokemon..."
        onChange={onChange}
      ></input>
      <div>
        <button
          className="pokemon_buttons"
          type="submit"
          onClick={searchButtonHandler}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

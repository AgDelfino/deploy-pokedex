import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Create.module.css";
import Pokemon from "../Pokemon/Pokemon";
import { formErrors, sendForm, validateForm } from "../../services/services";
import { useHistory } from "react-router-dom";

const Create = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const globalPokemons = useSelector((state) => state.pokemons);
  const history = useHistory();

  const [error, setError] = useState({
    name: "",
    attack: "",
    defense: "",
    hp: "",
    speed: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    dispatch(getAllTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    attack: "",
    defense: "",
    hp: "",
    speed: "",
    height: "",
    weight: "",
    types: ["", ""],
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setError(formErrors(input, globalPokemons));
  }, [input]);

  const handleTypesChange = (e) => {
    e.preventDefault();
    let type = e.target.name;
    let newType = [...input.types];

    if (input.types.find((t) => t === type)) {
      return setInput((state) => ({
        ...state,
        types: input.types.filter((t) => t !== type).concat(""),
      }));
    }

    if (input.types[0] && input.types[1]) {
      return setInput((state) => ({ ...state, types: newType }));
    }
    if (!input.types[0] && !input.types[1]) {
      newType[0] = type;
      return setInput((state) => ({ ...state, types: newType }));
    }
    if (input.types[0] && !input.types[1]) {
      newType[1] = type;
      return setInput((state) => ({ ...state, types: newType }));
    }
    if (!input.types[0] && input.types[1]) {
      newType[0] = type;
      return setInput((state) => ({ ...state, types: newType }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const validate = validateForm(input, globalPokemons);
      sendForm(input)
        .then((response) => alert(validate))
        .then(history.push("/pokemons"));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.h1_container}>
        <h1 class={styles.select_type_title}>CREATE YOUR POKEMON !</h1>
      </div>
      <div className={styles.father_container}>
        <div className={styles.form_container}>
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.name}
                name="name"
                type="text"
                onChange={(e) => handleChange(e)}
                maxLength="20"
              ></input>
              {error.name && <p className={styles.error}>{error.name}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.attack}
                name="attack"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.attack && <p className={styles.error}>{error.attack}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.defense}
                name="defense"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.defense && <p className={styles.error}>{error.defense}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.hp}
                name="hp"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.hp && <p className={styles.error}>{error.hp}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.speed}
                name="speed"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.speed && <p className={styles.error}>{error.speed}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.height}
                name="height"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.height && <p className={styles.error}>{error.height}</p>}
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                value={input.weight}
                name="weight"
                type="number"
                onChange={(e) => handleChange(e)}
              ></input>
              {error.weight && <p className={styles.error}>{error.weight}</p>}
            </div>
            <h2 className={styles.select_type_title}>
              SELECT YOUR POKEMONS TYPE :{" "}
            </h2>
            <div className={styles.types_create_container}>
              <div className={styles.button_container}>
                {types && types.length
                  ? types.map((type) => {
                      return (
                        <button
                          className={`${styles[type.name]} ${
                            styles.type_buttons
                          }`}
                          name={type.name}
                          value={type.name}
                          onClick={handleTypesChange}
                          key={type.name}
                        ></button>
                      );
                    })
                  : null}
              </div>
              <div className={styles.button_container}>
                <button className={styles.create_button} type="submit">
                  Catch' em!
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.card_container}>
          <Pokemon
            id={1}
            name={input.name}
            image={"https://i.imgur.com/bZfY4Fr.png"}
            attack={input.attack}
            type={input.types}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;

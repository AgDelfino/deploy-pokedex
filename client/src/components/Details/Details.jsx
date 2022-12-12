import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemonsByID, resetDetails } from "../../Redux/actions";
import loading from "../../images/PikachuLoad.gif";
import NavBar from "../NavBar/NavBar";
import styles from "./Details.module.css";
import ash from "../../images/ash.png";

const Details = () => {
  const pokemonDetails = useSelector((state) => state.pokemonDetails);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonsByID(id));
    return () => {
      dispatch(resetDetails());
    };
  }, []);

  useEffect(() => {
    console.log(pokemonDetails);
  }, [pokemonDetails]);

  const history = useHistory();

  const exitHandler = () => {
    history.push("/pokemons");
  };

  return (
    <div>
      <NavBar />
      {pokemonDetails ? (
        <>
          <h1 className="title">{`Hello I'm ${pokemonDetails.name}`}</h1>
          <div className={styles.flex}>
            <img className={styles.ash} src={ash} alt="Ash" />
            <div className={styles.main_container}>
              <button onClick={exitHandler} className={styles.exit_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className={styles.img_container}>
              <img className={styles.poke_img} src={pokemonDetails.image} />
              </div>
              <div className={styles.stats_container}>
                <span
                  className={styles.stats}
                >{`Atack: ${pokemonDetails.attack}`}</span>
                <span
                  className={styles.stats}
                >{`Defense: ${pokemonDetails.defense}`}</span>
                <span
                  className={styles.stats}
                >{`HP: ${pokemonDetails.hp}`}</span>
                <span
                  className={styles.stats}
                >{`Speed: ${pokemonDetails.speed}`}</span>
                <span
                  className={styles.stats}
                >{`Height: ${pokemonDetails.height}`}</span>
                <span
                  className={styles.stats}
                >{`Weight: ${pokemonDetails.weight}`}</span>
                {pokemonDetails.types.map((type) => {
                  return <span className={styles.stats}>{type.name}</span>;
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loading_container}>
          <div class="progress">
            <div class="color"></div>
            <img src={loading} alt="LOADING" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

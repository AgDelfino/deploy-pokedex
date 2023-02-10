import React from "react";
import { useEffect } from "react";
import styles from "./Pokemon.module.css";

const Pokemon = ({ id, name, image, attack, type }) => {


  useEffect(()=> {
  }, [type])

  return (
    <div className={`${styles.card_container} ${styles[type[0].name || type[0] || 'unknown']}`} key={id} >
      <div className={styles.card_container_title}>
        <span className={styles.card_title}>{name}</span>
      </div>
      <div className={styles.card_container1}>
        {image && <img className={styles.card_img} src={image} alt={name} />}
      </div>

      <div className={styles.card_container_types}>
        {type &&
          type.map((type, index) => {
            return <span className={styles.types_name} key={index}>{type.name ||type || 'unknown'}</span>;
          })}
      </div>
      <div className={styles.card_container_types}>
        <span className={styles.text_attack}>Attack: {attack}</span>
      </div>
    </div>
  );
};

export default Pokemon;

import React from "react";
import notFoundPik from "../../images/pikachu-what.gif";
import notFoundBulb from "../../images/bulbasaur.gif";
import styles from './NotFound.module.css'

const NotFound = ({ msg }) => {
  return (
    <div>
      <div>
        <h1>{msg}</h1>
      </div>
      <div className={styles.img_container}>
        <div>
          <img src={notFoundPik} alt=''/>
        </div>
        <div>
          <img className={styles.bulba} src={notFoundBulb} alt=''/>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";
import leftLogo from "../../images/logo_gif.png";
import styles from "./NavBar.module.css";
import rightLogo from "../../images/poke_title.png";
import titleGif from "../../images/title.gif";
import { useState } from "react";
import audio from '../../audio/AtrapalosYa.mp3'
import ReactHowler from 'react-howler'
const NavBar = () => {

  const [muted, setMuted] = useState(false)

  const musicHandler = () => {
    setMuted(true)
  }

  return (
    <div className={styles.nav_bar}> 

      <ReactHowler src={audio} playing={muted}/>
      
      {/* <audio src={audio} autoPlay muted={muted} loop></audio> */}
      <div className={styles.music_container}>
      <h4 className={styles.click_me} onClick={musicHandler}>CLICK ME</h4>
            <button className={styles.opening} onClick={() => {
                setMuted(!muted)
            }}></button>
      </div>
      <div className={styles.nav_bar_container}>
        <div className={styles.nav_bar_left}>
          <Link to="/">
            <img
              className={styles.nav_bar_logo}
              src={leftLogo}
              alt="LeftLogo"
            ></img>
          </Link>
          <div className={styles.nav_menu}>
            <ul>
              <li>
                <Link to="/pokemons">Home</Link>
              </li>
              <li>
                <Link to="/create">Create your Pokemon</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.nav_bar_right_container}>
          <div>
            <img className={styles.pokeball} src={titleGif} alt="Pokeball" />
          </div>
          <div className={styles.nav_bar_right}>
            <img className={styles.pokemon} src={rightLogo} alt="Pokemon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './About.module.css'

const About = () => {

    const history = useHistory()

    const exitHandler = () => {
        history.push('/pokemons')
    }

  return (
    <div className={styles.container}>
        
        <div className={styles.content}>
        <button className={styles.exit_button} onClick={exitHandler}><svg
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
                </svg></button>
            <h1 className={styles.about_title}>THIS POKEDEX WAS MADE BY: Agustín Delfino</h1>
            <p>
                I really hope that you enjoyed this SPA as much I enjoyed making it.<br/><br/>  
                At this point I just want to give special thanks to the friends who supported me in this amazing process:
                THANKS to Samyr Perez and Nicolás Castagnet who are amazing people, amazing developers, and above all those things, they are amazing friends. <br/> <br/> 
                Also I want to thank HENRY, because they provided me with the most incredible knowledge that I could possibly get. During this bootcamp I found the love for web development and I found that even when the things didn't go in the way I wanted, even then, I'm strong enough to finish the race and ACCEPT THE CHALLENGE! THANK YOU FOR THAT HENRY! <br/> <br/> 

                PD: don't forget to visit this amazing SPA made for Samyr Perez: <br/> <br/> 
                <a href='https://pi-samuel-rnn-videogames.vercel.app/' target='_blank'>- GAME XPLORE - </a>
            </p>
        </div>
    </div>
  )
}

export default About
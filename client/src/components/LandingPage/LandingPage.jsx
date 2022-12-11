import React, { useEffect } from "react";
import style from './LandingPage.module.css'
import { Link, useHistory } from "react-router-dom";
import pokedex from '../../images/pokedex.png'
import { useDispatch } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../Redux/actions";

const LandingPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    }, [dispatch])

    const handleClick = () => {
        setTimeout(() => {
            history.push('/pokemons')
        }, 1000)
    }

    

    return (
        <div className={style.lading_container}>
            <div className={style.container}>    
            <h1 className={style.title}>Welcome to your</h1>
            </div>
            <div className={style.container}>
                <img className={style.landing_img} src={pokedex} alt='Pokedex'/> 
            </div>
            
                <button className={style.landing_button} point onClick={handleClick}>Let's Go</button>
        </div>
    )
}

export default LandingPage;
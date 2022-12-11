import React from 'react'
import loading from "../../images/PikachuLoad.gif";
import styles from '../Loading/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading_container}>
    <div class="progress">
      <div class="color"></div>
      <img src={loading} alt="LOADING" />
    </div>
  </div>
  )
}

export default Loading;
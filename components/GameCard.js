import React from "react";
import styles from '../components/GameCard.module.css'

const GameCard = ({ imgSrc }) => {
  return (
    <div className={styles.gameCard}>
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default GameCard;

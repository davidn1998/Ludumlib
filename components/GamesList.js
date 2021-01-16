import React from "react";
import GameCard from "./GameCard";
import styles from "./GamesList.module.scss";
import Carousel from "react-elastic-carousel";

const GamesList = ({ slideUp }) => {
  return (
    <div className={styles.gameCarousel}>
      <div id={slideUp ? styles.gc1 : ""} className={styles.gameCard}>
        <GameCard imgSrc="/images/Fall_Guys_cover.jpg" />
      </div>
      <div id={slideUp ? styles.gc2 : ""} className={styles.gameCard}>
        <GameCard id={styles.gc2} imgSrc="/images/hades_cover.jpg" />
      </div>
      <div id={slideUp ? styles.gc3 : ""} className={styles.gameCard}>
        <GameCard id={styles.gc3} imgSrc="/images/control_cover.png" />
      </div>
      <div id={slideUp ? styles.gc4 : ""} className={styles.gameCard}>
        <GameCard id={styles.gc4} imgSrc="/images/dbd_cover.png" />
      </div>
      <div id={slideUp ? styles.gc5 : ""} className={styles.gameCard}>
        <GameCard id={styles.gc5} imgSrc="/images/cyberpunk_cover.png" />
      </div>
    </div>
  );
};

export default GamesList;

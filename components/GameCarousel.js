import React from "react";
import GameCard from "./GameCard";
import styles from "./GameCarousel.module.css";
import Carousel from "react-elastic-carousel";

const GameCarousel = ({ slideUp }) => {
  return (
    <div className={styles.gameCarousel}>
      <Carousel itemsToShow={6} pagination={false}>
        <div id={slideUp ? styles.gc1 : ""}>
          <GameCard imgSrc="/images/Fall_Guys_cover.jpg" />
        </div>
        <div id={slideUp ? styles.gc2 : ""}>
          <GameCard id={styles.gc2} imgSrc="/images/hades_cover.jpg" />
        </div>
        <div id={slideUp ? styles.gc3 : ""}>
          <GameCard id={styles.gc3} imgSrc="/images/control_cover.png" />
        </div>
        <div id={slideUp ? styles.gc4 : ""}>
          <GameCard id={styles.gc4} imgSrc="/images/dbd_cover.png" />
        </div>
        <div id={slideUp ? styles.gc5 : ""}>
          <GameCard id={styles.gc5} imgSrc="/images/spelunky2_cover.jpg" />
        </div>
        <div id={slideUp ? styles.gc6 : ""}>
          <GameCard id={styles.gc6} imgSrc="/images/cyberpunk_cover.png" />
        </div>
      </Carousel>
    </div>
  );
};

export default GameCarousel;

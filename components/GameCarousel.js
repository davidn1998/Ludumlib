import React from "react";
import GameCard from "./GameCard";
import styles from "./GameCarousel.module.css";
import Carousel from "react-elastic-carousel";

const GameCarousel = ({ slideUp }) => {
  const breakPoints = [
    {
      width: 1,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 800,
      itemsToShow: 3,
      itemsToScroll: 1,
    },
    {
      width: 1000,
      itemsToShow: 4,
      itemsToScroll: 1,
    },
    {
      width: 1500,
      itemsToShow: 5,
      itemsToScroll: 1,
    },
  ];

  return (
    <div className={styles.gameCarousel}>
      <Carousel
        itemsToShow={6}
        pagination={false}
        enableSwipe={false}
        enableMouseSwipe={false}
        focusOnSelect={false}
        breakPoints={breakPoints}
      >
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
        <div id={slideUp ? styles.gc6 : ""} className={styles.gameCard}>
          <GameCard id={styles.gc6} imgSrc="/images/spelunky2_cover.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default GameCarousel;

import React from "react";
import GameListCard from "./GameListCard";
import styles from "./GameListCarousel.module.css";
import Carousel from "react-elastic-carousel";

const GameCarousel = ({ slideUp }) => {
  const breakPoints = [
    {
      width: 1,
      itemsToShow: 1,
      itemsToScroll: 1,
    },
    {
      width: 600,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 1000,
      itemsToShow: 3,
      itemsToScroll: 1,
    },
    // {
    //   width: 1300,
    //   itemsToShow: 4,
    //   itemsToScroll: 1,
    // },
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
          <GameListCard
            imgSrc1="/images/hades_cover.jpg"
            imgSrc2="/images/Fall_Guys_cover.jpg"
            imgSrc3="/images/control_cover.png"
            listName="Best Games of the Summer"
          />
        </div>
        <div id={slideUp ? styles.gc2 : ""} className={styles.gameCard}>
          <GameListCard
            id={styles.gc2}
            imgSrc1="/images/Fall_Guys_cover.jpg"
            imgSrc2="/images/hades_cover.jpg"
            imgSrc3="/images/control_cover.png"
            listName="Best Games of the Summer"
          />
        </div>
        <div id={slideUp ? styles.gc3 : ""} className={styles.gameCard}>
          <GameListCard
            id={styles.gc3}
            imgSrc1="/images/Fall_Guys_cover.jpg"
            imgSrc2="/images/control_cover.png"
            imgSrc3="/images/hades_cover.jpg"
            listName="Best Games of the Summer"
          />
        </div>
        <div id={slideUp ? styles.gc4 : ""} className={styles.gameCard}>
          <GameListCard
            id={styles.gc4}
            imgSrc1="/images/dbd_cover.png"
            imgSrc2="/images/cyberpunk_cover.png"
            imgSrc3="/images/spelunky2_cover.jpg"
            listName="Best Games of the Summer"
          />
        </div>
        <div id={slideUp ? styles.gc5 : ""} className={styles.gameCard}>
          <GameListCard
            id={styles.gc5}
            imgSrc1="/images/cyberpunk_cover.png"
            imgSrc2="/images/dbd_cover.png"
            imgSrc3="/images/spelunky2_cover.jpg"
            listName="Best Games of the Summer"
          />
        </div>
        <div id={slideUp ? styles.gc6 : ""} className={styles.gameCard}>
          <GameListCard
            id={styles.gc6}
            imgSrc1="/images/dbd_cover.png"
            imgSrc2="/images/spelunky2_cover.jpg"
            imgSrc3="/images/cyberpunk_cover.png"
            listName="Best Games of the Summer"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default GameCarousel;

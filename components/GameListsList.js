import React from "react";
import GameListCard from "./GameListCard";
import styles from "./GameListsList.module.scss";

const GameLists = ({ slideUp }) => {
  return (
    <div className={styles.gameCarousel}>
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
    </div>
  );
};

export default GameLists;

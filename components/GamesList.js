import React from "react";
import GameCard from "./GameCard";
import styles from "./GamesList.module.scss";

const GamesList = ({ slideUp, data }) => {
  const gameList = data ? (
    data.map((game, index) => {
      let styleid = styles.gc1;
      switch (index) {
        case 0:
          styleid = styles.gc1;
          break;
        case 1:
          styleid = styles.gc2;
          break;
        case 2:
          styleid = styles.gc3;
          break;
        case 3:
          styleid = styles.gc4;
          break;
        case 4:
          styleid = styles.gc5;
          break;
        case 5:
          styleid = styles.gc6;
          break;
        default:
          styleid = styles.gc1;
          break;
      }
      return (
        <div
          key={game.id}
          id={slideUp ? styleid : ""}
          className={styles.gameCard}
        >
          <GameCard gameData={game} />
        </div>
      );
    })
  ) : (
    <></>
  );

  return <div className={styles.gameList}>{gameList}</div>;
};

export default GamesList;

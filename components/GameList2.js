import React from "react";
import GameCard2 from "./GameCard2";
import styles from "./GamesList.module.scss";

const GamesList2 = ({ games }) => {
  const gameList = games ? (
    games.map((game, index) => (
      <div key={game.value} className={styles.gameCard}>
        <GameCard2 id={game.value} />
      </div>
    ))
  ) : (
    <></>
  );

  return <div className={styles.gameList}>{gameList}</div>;
};

export default GamesList2;

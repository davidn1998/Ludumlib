import React from "react";
import GameListCard from "./GameListCard";
import styles from "./GameListsList.module.scss";

const GameLists = ({ data }) => {
  return (
    <div className={styles.gameList}>
      {data?.map((list) => (
        <div className={styles.gameCard} key={list._id}>
          <GameListCard list={list} />
        </div>
      ))}
    </div>
  );
};

export default GameLists;

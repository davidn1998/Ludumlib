import React from "react";
import styles from "../components/GameListCard.module.scss";
import Link from "next/link";

const GameListCard = ({ imgSrc1, imgSrc2, imgSrc3, listName }) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.gameListCard}>
          <div
            className={styles.card}
            id={styles.card1}
            style={{ backgroundImage: `url(${imgSrc1})` }}
          ></div>
          <div
            className={styles.card}
            id={styles.card2}
            style={{ backgroundImage: `url(${imgSrc2})` }}
          ></div>
          <div
            className={styles.card}
            id={styles.card3}
            style={{ backgroundImage: `url(${imgSrc3})` }}
          ></div>
        </a>
      </Link>
      <p className={styles.listName}>{listName}</p>
    </div>
  );
};

export default GameListCard;

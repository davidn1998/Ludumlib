import React from "react";
import styles from "../components/GameListCard.module.scss";
import Link from "next/link";

const GameListCard = ({ imgSrc1, imgSrc2, imgSrc3, listName }) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.gameListCard}>
          <img id={styles.card1} src={imgSrc1} alt="" />
          <img id={styles.card2} src={imgSrc2} alt="" />
          <img id={styles.card3} src={imgSrc3} alt="" />
        </a>
      </Link>
      <p className={styles.listName}>{listName}</p>
    </div>
  );
};

export default GameListCard;

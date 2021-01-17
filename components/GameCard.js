import React from "react";
import styles from "../components/GameCard.module.scss";
import Link from "next/link";

const GameCard = ({ imgSrc }) => {
  return (
    <Link href="/">
      <a className={styles.gameCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>
      </a>
    </Link>
  );
};

export default GameCard;

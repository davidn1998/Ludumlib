import React from "react";
import styles from "../components/GameCard.module.css";
import Link from "next/link";

const GameCard = ({ imgSrc }) => {
  return (
    <Link href="/">
      <a className={styles.gameCard}>
        <img src={imgSrc} alt="" />
      </a>
    </Link>
  );
};

export default GameCard;

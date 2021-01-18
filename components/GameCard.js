import React from "react";
import styles from "../components/GameCard.module.scss";
import Link from "next/link";

const GameCard = ({ gameData }) => {
  return (
    <Link href={`/games/${gameData.slug}/${gameData.id}`}>
      <a className={styles.gameCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${gameData.background_image})` }}
        ></div>
      </a>
    </Link>
  );
};

export default GameCard;

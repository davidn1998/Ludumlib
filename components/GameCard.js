import React from "react";
import styles from "../components/GameCard.module.scss";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

const GameCard = ({ gameData }) => {
  return (
    <Link href={`/games/${gameData.slug}/${gameData.id}`}>
      <a className={styles.gameCard}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${gameData.background_image})` }}
          data-tip={gameData.name}
        ></div>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </a>
    </Link>
  );
};

export default GameCard;

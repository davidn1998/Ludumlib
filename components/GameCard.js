import React from "react";
import styles from "../components/GameCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import ReactTooltip from "react-tooltip";

const GameCard = ({ gameData, id }) => {
  return (
    <Link href={`/games/${gameData.slug}/${gameData.id}`}>
      <a className={styles.gameCard} data-tip={gameData.name}>
        <Image
          layout="fill"
          objectFit="cover"
          style={{ overflow: "visible" }}
          className={styles.image}
          src={
            gameData.background_image
              ? gameData.background_image
              : "/images/default_cover.png"
          }
          alt={gameData.name}
        />
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </a>
    </Link>
  );
};

export default GameCard;

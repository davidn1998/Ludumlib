import React from "react";
import styles from "../components/GameListCard.module.scss";
import Link from "next/link";
import Image from "next/image";

const GameListCard = ({ imgSrc1, imgSrc2, imgSrc3, listName }) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.gameListCard}>
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card1}
            src={imgSrc1}
            alt={""}
          />
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card2}
            src={imgSrc2}
            alt={""}
          />
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card3}
            src={imgSrc3}
            alt={""}
          />
        </a>
      </Link>
      <p className={styles.listName}>{listName}</p>
    </div>
  );
};

export default GameListCard;

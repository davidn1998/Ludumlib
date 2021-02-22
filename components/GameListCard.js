import React from "react";
import styles from "../components/GameListCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useGetGameData } from "../util/useRequest";

const GameListCard = ({ list }) => {
  const { gameData: gameData1, gameError: gameError1 } = useGetGameData(
    list.games[0].value
  );
  const { gameData: gameData2, gameError: gameError2 } = useGetGameData(
    list.games[1].value
  );
  const { gameData: gameData3, gameError: gameError3 } = useGetGameData(
    list.games[2].value
  );

  return (
    <div className={styles.container}>
      <Link href={`/lists/${list.title.replaceAll(" ", "-")}/${list._id}`}>
        <a className={styles.gameListCard}>
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card1}
            src={
              gameData2
                ? gameData2.background_image
                : "/images/default_cover.png"
            }
            alt={""}
          />
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card2}
            src={
              gameData1
                ? gameData1.background_image
                : "/images/default_cover.png"
            }
            alt={""}
          />
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.card}
            id={styles.card3}
            src={
              gameData3
                ? gameData3.background_image
                : "/images/default_cover.png"
            }
            alt={""}
          />
        </a>
      </Link>
      <p className={styles.listName}>{list.title}</p>
    </div>
  );
};

export default GameListCard;

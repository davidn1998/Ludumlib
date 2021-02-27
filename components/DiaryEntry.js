import Image from "next/image";
import Link from "next/link";
import styles from "./DiaryEntry.module.scss";
import { useGetGameData } from "../util/useRequest";

const DiaryEntry = ({ data }) => {
  const { gameData, gameError } = useGetGameData(data.game.value);

  const date = new Date(data.date);

  return (
    <div className={styles.diaryEntry}>
      {gameData && gameData.background_image ? (
        <Image
          layout="fill"
          objectFit="cover"
          className={styles.gameBackground}
          src={gameData.background_image}
          alt={""}
        />
      ) : (
        <></>
      )}
      <p className={styles.date}>{date.toLocaleDateString()}</p>
      <p className={styles.game}>
        <Link href={`/games/${gameData?.slug}/${gameData?.id}`}>
          <a>{gameData?.name}</a>
        </Link>
      </p>

      <p className={styles.hours}>{data?.hours} Hours Played</p>
    </div>
  );
};

export default DiaryEntry;

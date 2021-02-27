import Image from "next/image";
import Link from "next/link";
import styles from "./DiaryEntry.module.scss";
import { useGetGameData } from "../util/useRequest";

import ReactTooltip from "react-tooltip";
import { Icon } from "@iconify/react";
import pencilIcon from "@iconify/icons-fa-solid/pencil-alt";
import trashIcon from "@iconify/icons-fa-solid/trash";

const DiaryEntry = ({
  data,
  setLogToEdit,
  setLogModalVisible,
  setDeleteModalVisible,
}) => {
  const { gameData, gameError } = useGetGameData(data.game.value);

  const date = new Date(data.date);

  const onEditClick = () => {
    setLogToEdit(data);
    setLogModalVisible(true);
  };
  const onDeleteClick = () => {
    setLogToEdit(data);
    setDeleteModalVisible(true);
  };

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
      <div className={styles.glassButtons}>
        <button
          className={styles.button}
          data-tip={"Edit Entry"}
          data-type="success"
          onClick={onEditClick}
        >
          {<Icon icon={pencilIcon} width={20} />}
        </button>
        <button
          className={styles.button}
          data-tip={"Delete Entry"}
          data-type="error"
          onClick={onDeleteClick}
        >
          {<Icon icon={trashIcon} width={20} />}
        </button>
        <ReactTooltip place="bottom" type="light" effect="solid" />
      </div>
    </div>
  );
};

export default DiaryEntry;

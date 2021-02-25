import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GamesList2 from "../GameList2";

// UI Icons
import { Icon } from "@iconify/react";
import gamesIcon from "@iconify/icons-fa-solid/gamepad";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

const Games = ({ user }) => {
  const [pageNum, setPageNum] = useState(1);

  const pageSize = 18;

  const prevResults = () => {
    setPageNum(pageNum - 1);
  };

  const nextResults = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={gamesIcon} /> <span>Games</span>
      </h1>
      <div>
        {!user.played || user.played?.length < 1 ? (
          <p>No Games...</p>
        ) : (
          <>
            {[...Array(Math.ceil(pageSize / 6)).keys()].map((i) => (
              <GamesList2
                games={user.played.slice(
                  i * 6 + (pageNum - 1) * pageSize,
                  i * 6 + 6 + (pageNum - 1) * pageSize
                )}
                key={i}
              />
            ))}
            <div className={styles.pageButtons}>
              <div className={styles.glassButtons}>
                <button
                  className={`${styles.button} ${
                    pageNum == 1 ? styles.disabled : ""
                  }`}
                  disabled={pageNum == 1}
                  onClick={prevResults}
                >
                  {<Icon icon={arrowIconLeft} width={25} />}
                </button>
                <button
                  className={`${styles.button} ${
                    pageNum == Math.ceil(user.played.length / pageSize) ||
                    user.played.length == 0
                      ? styles.disabled
                      : ""
                  }`}
                  disabled={
                    pageNum == Math.ceil(user.played.length / pageSize) ||
                    user.played.length == 0
                  }
                  onClick={nextResults}
                >
                  {<Icon icon={arrowIconRight} width={25} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Games;

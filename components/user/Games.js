import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GamesList2 from "../GameList2";

// UI Icons
import { Icon } from "@iconify/react";
import gamesIcon from "@iconify/icons-fa-solid/gamepad";

const Games = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={gamesIcon} /> <span>Games</span>
      </h1>
      <div>
        {!user.played || user.played?.length < 1 ? <p>No Games...</p> : <></>}
        {user.played ? (
          user.played.length > 0 ? (
            [...Array(Math.ceil(user.played.length / 6)).keys()].map((i) => (
              <GamesList2 games={user.played.slice(i * 6, i * 6 + 6)} key={i} />
            ))
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Games;

import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Icons
import { Icon } from "@iconify/react";
import gamesIcon from "@iconify/icons-fa-solid/gamepad";

const Games = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={gamesIcon} /> <span>Games</span>
      </h1>
    </div>
  );
};

export default Games;

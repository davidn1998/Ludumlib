import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GamesList2 from "../GameList2";

// UI Icons
import { Icon } from "@iconify/react";
import likeIcon from "@iconify/icons-fa-solid/thumbs-up";

const Likes = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={likeIcon} /> <span>Likes</span>
      </h1>
      <div>
        {[...Array(Math.ceil(user.likes.length / 6)).keys()].map((i) => (
          <GamesList2 games={user.likes.slice(i * 6, i * 6 + 6)} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Likes;

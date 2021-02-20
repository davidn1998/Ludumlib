import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Icons
import { Icon } from "@iconify/react";
import likeIcon from "@iconify/icons-fa-solid/thumbs-up";

const Likes = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={likeIcon} /> <span>Likes</span>
      </h1>
    </div>
  );
};

export default Likes;

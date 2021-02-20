import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Icons
import { Icon } from "@iconify/react";
import listIcon from "@iconify/icons-fa-solid/list";

const Lists = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={listIcon} /> <span>Lists</span>
      </h1>
    </div>
  );
};

export default Lists;

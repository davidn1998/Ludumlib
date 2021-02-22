import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Icons
import { Icon } from "@iconify/react";
import calendarIcon from "@iconify/icons-fa-solid/calendar-alt";

// TODO: create diary entry component and import here

const Diary = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={calendarIcon} /> <span>Diary</span>
      </h1>
    </div>
  );
};

export default Diary;
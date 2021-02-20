import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Icons
import { Icon } from "@iconify/react";
import profileIcon from "@iconify/icons-fa-solid/user";

const Profile = ({ user }) => {
  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={profileIcon} /> <span>Profile</span>
      </h1>
    </div>
  );
};

export default Profile;

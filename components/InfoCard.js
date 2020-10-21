import React from "react";
import styles from "./InfoCard.module.css";
import { Icon, InlineIcon } from "@iconify/react";
import gamepadIcon from "@iconify/icons-fa-solid/gamepad";

const InfoCard = ({ svgIcon }) => {
  return (
    <div className={styles.infoCard}>
      {svgIcon}
      <p className={styles.infoText}>
        Keep track of all the games you’ve played with a personal journal
      </p>
    </div>
  );
};

export default InfoCard;

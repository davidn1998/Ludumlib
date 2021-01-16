import React from "react";
import styles from "./InfoCard.module.scss";
import { Icon, InlineIcon } from "@iconify/react";
import gamepadIcon from "@iconify/icons-fa-solid/gamepad";

const InfoCard = ({ svgIcon, infoText }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoIcon}>{svgIcon}</div>
      <p className={styles.infoText}>{infoText}</p>
    </div>
  );
};

export default InfoCard;

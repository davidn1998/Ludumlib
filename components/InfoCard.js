import React from "react";
import styles from "./InfoCard.module.css";
import { Icon, InlineIcon } from "@iconify/react";
import gamepadIcon from "@iconify/icons-fa-solid/gamepad";

const InfoCard = ({ svgIcon, infoText }) => {
  return (
    <div className={styles.infoCard}>
      {svgIcon}
      <p className={styles.infoText}>
        {infoText}
      </p>
    </div>
  );
};

export default InfoCard;

import React from "react";
import styles from "./MainButton.module.css";

const MainButton = ({ buttonText, animated }) => {
  return (
    <a className={`${styles.mainButton} ${animated ? styles.animated : ""}`}>
      {buttonText}
    </a>
  );
};

export default MainButton;

import React from "react";
import styles from "./MainButton.module.scss";
import Link from "next/link";

const MainButton = ({ buttonText, animated }) => {
  return (
    <Link href="">
      <a className={`${styles.mainButton} ${animated ? styles.animated : ""}`}>
        {buttonText}
      </a>
    </Link>
  );
};

export default MainButton;

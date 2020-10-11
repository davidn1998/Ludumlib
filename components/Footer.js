import React from "react";
import styles from "../components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        Copyright © 2020 Ludumlib, Inc. All rights reserved. Game data from{" "}
        <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
          RAWG.
        </a>
      </div>
    </footer>
  );
};

export default Footer;

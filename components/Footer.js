import React from "react";
import Link from "next/link";
import styles from "../components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2020 Ludumlib</p>
      <div className={styles.links}>
        <div className={styles.link}>
          <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
            Game data from RAWG
          </a>
        </div>
        <div className={styles.link}>
          <Link href="/terms">
            <a> Terms and Conditions</a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href="/privacy-policy">
            <a> Privacy Policy</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

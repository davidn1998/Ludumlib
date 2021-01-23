import React from "react";
import Link from "next/link";
import styles from "../components/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        Copyright © 2020 Ludumlib, Inc. All rights reserved.{" "}
        <Link href="/terms">
          <a> Terms and Conditions.</a>
        </Link>{" "}
        <Link href="/privacy-policy">
          <a> Privacy Policy.</a>
        </Link>{" "}
        Game data from{" "}
        <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
          RAWG.
        </a>
      </div>
    </footer>
  );
};

export default Footer;

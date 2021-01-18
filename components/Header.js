import React from "react";
import Navbar from "./Navbar";
import HamburgerNav from "./HamburgerNav";
import Logo from "./Logo";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <Navbar />
      </header>
      <HamburgerNav />
    </>
  );
};

export default Header;

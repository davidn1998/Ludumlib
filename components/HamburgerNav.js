import React, { useState } from "react";
import Link from "next/link";
import styles from "./HamburgerNav.module.scss";
import { fallDown as Menu } from "react-burger-menu";

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.hamburgerMenu}>
      <Menu styles={burgerStyles} isOpen={false} noOverlay disableAutoFocus>
        <Link href="#">
          <a className="bm-item menu-item">GAMES</a>
        </Link>
        <Link href="#">
          <a className="bm-item menu-item">LOGIN</a>
        </Link>
        <Link href="#">
          <a className="bm-item menu-item">SIGN UP</a>
        </Link>
      </Menu>
    </div>
  );
};

var burgerStyles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "absolute",
    height: "50%",
    width: "100%",
    top: 0,
    left: 0,
  },
  bmMenu: {
    background: "#0a0028",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.5)",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "0.8em",
  },
  bmItem: {
    margin: "auto",
    textAlign: "center",
    color: "#fff",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.8)",
    left: 0,
    top: 0,
  },
};

export default HamburgerNav;
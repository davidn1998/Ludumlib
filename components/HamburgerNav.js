import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./HamburgerNav.module.scss";
import { fallDown as Menu } from "react-burger-menu";

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={styles.hamburgerMenu}>
      <Menu styles={burgerStyles} isOpen={false} noOverlay disableAutoFocus>
        <Link href="/">
          <a
            className={`"bm-item menu-item" ${
              router.pathname == "/" ? styles.active : null
            }`}
          >
            HOME
          </a>
        </Link>
        <Link href="/games">
          <a
            className={`"bm-item menu-item" ${
              router.pathname == "/games" ? styles.active : null
            }`}
          >
            GAMES
          </a>
        </Link>
        <Link href="/login">
          <a
            className={`"bm-item menu-item" ${
              router.pathname == "/login" ? styles.active : null
            }`}
          >
            LOGIN
          </a>
        </Link>
        <Link href="/signup">
          <a
            className={`"bm-item menu-item" ${
              router.pathname == "/signup" ? styles.active : null
            }`}
          >
            SIGN UP
          </a>
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
    right: "20px",
    top: "20px",
  },
  bmBurgerBars: {
    background: "#fff",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#fff",
  },
  bmMenuWrap: {
    position: "absolute",
    height: "50%",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 2000,
  },
  bmMenu: {
    background: "#0a0028",
    // backgroundColor: "rgba(0, 0, 0, 0.15)",
    // backdropFilter: "blur(10px)",
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

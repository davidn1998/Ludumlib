import React, { useEffect } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

import styles from "../components/Navbar.module.scss";

const Navbar = () => {
  let navView = (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="#">
            <a>GAMES</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>LOGIN</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>SIGN UP</a>
          </Link>
        </li>
      </ul>
    </nav>
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 600px)");
    navView = mql.matches ? (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
      </Menu>
    ) : (
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="#">
              <a>GAMES</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>LOGIN</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>SIGN UP</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  });

  return navView;
};

export default Navbar;

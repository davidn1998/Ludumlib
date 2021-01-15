import React from "react";
import Link from "next/link";

import styles from "../components/Navbar.module.scss";

const Navbar = () => {
  return (
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
};

export default Navbar;

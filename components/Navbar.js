import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import HamburgerNav from "./HamburgerNav";

const Navbar = () => {
  return (
    <div>
      <HamburgerNav />
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
    </div>
  );
};

export default Navbar;

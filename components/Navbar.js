import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import HamburgerNav from "./HamburgerNav";

const Navbar = () => {
  const router = useRouter();

  return (
    <div>
      <HamburgerNav />
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname == "/" ? styles.active : null}>
                HOME
              </a>
            </Link>
          </li>
          <li>
            <Link href="/games">
              <a
                className={
                  router.pathname == "/resultsForm" ? styles.active : null
                }
              >
                GAMES
              </a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a className={router.pathname == "/login" ? styles.active : null}>
                LOGIN
              </a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a
                className={router.pathname == "/signup" ? styles.active : null}
              >
                SIGN UP
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

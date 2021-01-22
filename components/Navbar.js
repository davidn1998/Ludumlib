import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const router = useRouter();

  return (
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
            <a className={router.pathname == "/games" ? styles.active : null}>
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
            <a className={router.pathname == "/signup" ? styles.active : null}>
              SIGN UP
            </a>
          </Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;

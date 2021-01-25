import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../util/auth";

import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();
  const auth = useAuth();

  const onLogout = () => {
    auth.signout().catch((err) => {
      toast.error("Failed to logout.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <nav className={styles.navbar}>
      <ToastContainer />
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
        {auth.user ? (
          <li>
            <a onClick={onLogout}>LOGOUT</a>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">
                <a
                  className={router.pathname == "/login" ? styles.active : null}
                >
                  LOGIN
                </a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a
                  className={
                    router.pathname == "/signup" ? styles.active : null
                  }
                >
                  SIGN UP
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;

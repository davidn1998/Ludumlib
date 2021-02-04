import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../util/auth";

import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();
  const auth = useAuth();
  const [dropMenuOpen, setDropMenuOpen] = useState(false);

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
        {auth.user ? (
          <div
            className={styles.dropdown}
            onMouseOver={() => setDropMenuOpen(true)}
            onMouseLeave={() => setDropMenuOpen(false)}
          >
            <a className={styles.dropdownToggle}>
              <ProfilePic
                source={auth.user?.pfp?.uri}
                width={"30px"}
                height={"30px"}
              />
              {auth.user.username.toUpperCase()}
            </a>
            <ul
              className={`${styles.dropdownMenu} ${
                dropMenuOpen ? styles.show : styles.hide
              }`}
            >
              <li>
                <Link href="/">
                  <a className={router.pathname == "/" ? styles.active : null}>
                    HOME
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/user/${auth.user.username}`}>
                  <a
                    className={
                      router.query.username == `${auth.user.username}`
                        ? styles.active
                        : null
                    }
                  >
                    PROFILE
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/settings`}>
                  <a
                    className={
                      router.pathname == `/settings` ? styles.active : null
                    }
                  >
                    SETTINGS
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={onLogout}>LOGOUT</a>
              </li>
            </ul>
          </div>
        ) : auth.user === null ? (
          <></>
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
        <li>
          <Link href="/games">
            <a className={router.pathname == "/games" ? styles.active : null}>
              GAMES
            </a>
          </Link>
        </li>
        <li>
          <Link href="/reviews">
            <a className={router.pathname == "/reviews" ? styles.active : null}>
              REVIEWS
            </a>
          </Link>
        </li>
        <li>
          <Link href="/lists">
            <a className={router.pathname == "/lists" ? styles.active : null}>
              LISTS
            </a>
          </Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;

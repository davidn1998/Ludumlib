import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../util/auth";

import styles from "./HamburgerNav.module.scss";
import { fallDown as Menu } from "react-burger-menu";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className={styles.hamburgerMenu}>
      <Menu styles={burgerStyles} isOpen={false} noOverlay disableAutoFocus>
        {auth.user ? (
          <a className={styles.profileHeader}>
            <ProfilePic
              source={auth.user?.pfp?.uri}
              width={"40px"}
              height={"40px"}
            />
            {auth.user.username.toUpperCase()}
          </a>
        ) : (
          <></>
        )}
        <Link href="/games">
          <a className={router.pathname == "/games" ? styles.active : null}>
            GAMES
          </a>
        </Link>
        <Link href="/reviews">
          <a className={router.pathname == "/reviews" ? styles.active : null}>
            REVIEWS
          </a>
        </Link>
        <Link href="/lists">
          <a className={router.pathname == "/lists" ? styles.active : null}>
            LISTS
          </a>
        </Link>
        {auth.user ? (
          <>
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
            <Link href={`/settings`}>
              <a
                className={
                  router.pathname == `/settings` ? styles.active : null
                }
              >
                SETTINGS
              </a>
            </Link>
            <a className={`"bm-item menu-item"`} onClick={onLogout}>
              LOGOUT
            </a>
          </>
        ) : auth.user === false ? (
          <>
            {" "}
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
          </>
        ) : (
          <></>
        )}
        <SearchBar />
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
    height: "75vh",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 2000,
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

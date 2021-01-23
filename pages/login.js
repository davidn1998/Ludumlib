import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import styles from "../styles/index.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import lockIcon from "@iconify/icons-fa-solid/lock";
import userIcon from "@iconify/icons-fa-solid/user";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

export default function login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBackgroundImage = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const currDate = new Date();
    const { data: games, error } = useSWR(
      mounted
        ? `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&dates=${
            currDate.getFullYear() - 1
          }-01-01,${currDate.toISOString().substr(0, 10)}&page_size=12`
        : null,
      fetcher,
      { revalidateOnFocus: false }
    );

    console.error(error);

    const { data: game, error: error2 } = useSWR(
      () =>
        `https://api.rawg.io/api/games/${
          games.results[Math.floor(Math.random() * games.results.length)].id
        }?key=c2cfee3aa5494adfacb4b77caa093322`,
      fetcher,
      { revalidateOnFocus: false }
    );

    console.error(error2);

    if (!game) return null;

    return game.background_image;
  };

  const backgroundImage = getBackgroundImage();

  console.log(backgroundImage);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.box}>
            <div className={styles.square} style={{ "--i": 0 }}></div>
            <div className={styles.square} style={{ "--i": 1 }}></div>
            <div className={styles.square} style={{ "--i": 2 }}></div>
            <div className={styles.square} style={{ "--i": 3 }}></div>
            <div className={styles.square} style={{ "--i": 4 }}></div>
            <div className={styles.form}>
              <h2 className={styles.heading}>Login</h2>
              <div className={styles.inputBox}>
                <div className={styles.iconLeft}>
                  <Icon icon={userIcon} />
                </div>
                <input type="text" placeholder="Username" />
              </div>
              <div className={styles.inputBox}>
                <div className={styles.iconLeft}>
                  <Icon icon={lockIcon} />{" "}
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  style={{ paddingRight: "3rem" }}
                />
                <div
                  className={`${styles.iconRight} ${styles.clickable}`}
                  onClick={togglePasswordVisibility}
                >
                  <Icon icon={passwordVisible ? eyeOpenIcon : eyeClosedIcon} />{" "}
                </div>
              </div>
              <div className={styles.inputBox}>
                <button type="submit">Login</button>
              </div>
              <p className={styles.forgot}>
                Forgot your password? <a href="">Click Here</a>
              </p>
              <p className={styles.forgot}>
                Don't have an account? <a href="">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

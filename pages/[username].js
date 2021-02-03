import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

import styles from "../styles/index.module.scss";
import navStyles from "../components/Navbar.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  const [tab, setTab] = useState(1);

  return (
    <div className={styles.container}>
      <Head>
        <title> {username} | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>{username}</h2>
        <div className={styles.tabSelect}>
          <ul>
            <div className={styles.row} id={styles.row1}>
              <li>
                <a className={tab === 1 ? styles.active : null}>Profile</a>
              </li>
              <li>
                <a className={tab === 2 ? styles.active : null}>Games</a>
              </li>
              <li>
                <a className={tab === 3 ? styles.active : null}>Diary</a>
              </li>
            </div>
            <div className={styles.row}>
              <li>
                <a className={tab === 4 ? styles.active : null}>Reviews</a>
              </li>
              <li>
                <a className={tab === 5 ? styles.active : null}>Lists</a>
              </li>
              <li>
                <a className={tab === 6 ? styles.active : null}>Likes</a>
              </li>
            </div>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
}

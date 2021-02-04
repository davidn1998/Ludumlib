import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "../../util/auth";

import styles from "../../styles/index.module.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfilePic from "../../components/ProfilePic";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  const auth = useAuth();

  const [tab, setTab] = useState(1);
  const [tabView, setTabView] = useState(null);

  const { data, error } = useSWR(`/api/user/profile/${username}`, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) {
    console.error("Could not load game data");
  }

  const changeTab = (tabNum) => {
    switch (tabNum) {
      case 1:
        setTab(1);
        setTabView(null);
        break;
      case 2:
        setTab(2);
        setTabView(null);
        break;
      case 3:
        setTab(3);
        setTabView(null);
        break;
      case 4:
        setTab(4);
        setTabView(null);
        break;
      case 5:
        setTab(5);
        setTabView(null);
        break;
      case 6:
        setTab(6);
        setTabView(null);
        break;

      default:
        setTabView(null);
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> {username} | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <h2 className={styles.subHeading}>
            {" "}
            <ProfilePic
              source={
                data?.pfp?.uri ? data?.pfp?.uri : "/images/defaultpfp.png"
              }
              width="100px"
              height="100px"
            />
            {username?.toUpperCase()}
          </h2>
        </div>
        <div className={styles.tabSelect}>
          <ul>
            <div className={styles.row} id={styles.row1}>
              <li>
                <a
                  className={tab === 1 ? styles.active : null}
                  onClick={() => changeTab(1)}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className={tab === 2 ? styles.active : null}
                  onClick={() => changeTab(2)}
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  className={tab === 3 ? styles.active : null}
                  onClick={() => changeTab(3)}
                >
                  Diary
                </a>
              </li>
            </div>
            <div className={styles.row}>
              <li>
                <a
                  className={tab === 4 ? styles.active : null}
                  onClick={() => changeTab(4)}
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  className={tab === 5 ? styles.active : null}
                  onClick={() => changeTab(5)}
                >
                  Lists
                </a>
              </li>
              <li>
                <a
                  className={tab === 6 ? styles.active : null}
                  onClick={() => changeTab(6)}
                >
                  Likes
                </a>
              </li>
            </div>
          </ul>
        </div>
        {tabView}
        <Footer />
      </div>
    </div>
  );
}

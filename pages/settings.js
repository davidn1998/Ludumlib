import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

// Styles
import styles from "../styles/index.module.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSettings from "../components/ProfileSettings";
import EmailSettings from "../components/EmailSettings";

import { useAuth } from "../util/auth";

export default function Settings() {
  const router = useRouter();
  const auth = useAuth();

  const [tab, setTab] = useState(1);
  const [tabView, setTabView] = useState(null);

  useEffect(() => {
    if (auth.user === false) {
      router.push(`/`);
      return;
    }

    changeTab(tab);
  }, [auth.user]);

  const changeTab = (tabNum) => {
    switch (tabNum) {
      case 1:
        setTab(1);
        setTabView(<ProfileSettings auth={auth} />);
        break;
      case 2:
        setTab(2);
        setTabView(null);
        break;
      case 3:
        setTab(3);
        setTabView(<EmailSettings auth={auth} />);
        break;
      case 4:
        setTab(4);
        setTabView(null);
        break;

      default:
        setTabView(null);
        break;
    }
  };

  return (
    <div className={styles.container}>
      {!auth.user ? (
        <></>
      ) : (
        <>
          <Head>
            <title> Settings | Ludumlib</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <div className={styles.main}>
            <h2 className={styles.subHeading}>Settings</h2>
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
                      Connections
                    </a>
                  </li>
                </div>
                <div className={styles.row} id={styles.row2}>
                  <li>
                    <a
                      className={tab === 3 ? styles.active : null}
                      onClick={() => changeTab(3)}
                    >
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      className={tab === 4 ? styles.active : null}
                      onClick={() => changeTab(4)}
                    >
                      Password
                    </a>
                  </li>
                </div>
              </ul>
            </div>
            {tabView}
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

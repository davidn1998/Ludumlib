import { useState } from "react";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { useGetUserData } from "../../util/useRequest";
import { useAuth } from "../../util/auth";

import styles from "../../styles/index.module.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfilePic from "../../components/ProfilePic";

// Tabs
import Reviews from "../../components/user/Reviews";
import Diary from "../../components/user/Diary";

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  const auth = useAuth();

  const [tab, setTab] = useState(1);
  const [tabView, setTabView] = useState(null);

  const { userData, userError } = useGetUserData("", username);

  if (userError) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (!userData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Profile | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}></div>
      </div>
    );
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
        setTabView(<Diary user={userData} />);
        break;
      case 4:
        setTab(4);
        setTabView(<Reviews user={userData} />);
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
            <div className={styles.profileHeading}>
              <div className={styles.profileTitle}>
                <ProfilePic
                  source={
                    userData?.pfp?.uri
                      ? userData?.pfp?.uri
                      : "/images/defaultpfp.png"
                  }
                  width="100px"
                  height="100px"
                />
                <span>{username?.toUpperCase()}</span>
              </div>
              {auth.user && auth.user.username === username ? (
                <div className={styles.glassButtons}>
                  <button
                    className={styles.button}
                    onClick={() => router.push("/settings")}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
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

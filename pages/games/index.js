import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetGamesData } from "../../util/useRequest";

import styles from "../../styles/index.module.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamesList from "../../components/GamesList";
import { Icon, InlineIcon } from "@iconify/react";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

export default function Games() {
  const router = useRouter();
  const { page } = router.query;

  const pageNum = page || 1;
  const pageSize = 18;
  const currDate = new Date();

  const { gamesData, gamesError } = useGetGamesData(
    `${currDate.getFullYear() - 1}-01-01,${currDate
      .toISOString()
      .substr(0, 10)}`,
    pageSize,
    pageNum
  );

  if (gamesError) {
    console.error("Could not load game data");
  }

  if (!gamesData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Games | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}>
          <h2 className={styles.subHeading}>Popular Games</h2>
          <Footer />
        </div>
      </div>
    );
  }

  const prevResults = () => {
    router.push(`/games?page=${parseInt(pageNum) - 1}`);
  };

  const nextResults = () => {
    router.push(`/games?page=${parseInt(pageNum) + 1}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Games | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>Popular Games</h2>
        {[...Array(pageSize / 6).keys()].map((i) => (
          <GamesList
            slideUp={false}
            data={gamesData.results.slice(i * 6, i * 6 + 6)}
            key={i}
          />
        ))}
        <div className={styles.pageButtons}>
          <div className={styles.glassButtons}>
            <button
              className={`${styles.button} ${
                pageNum == 1 ? styles.disabled : ""
              }`}
              disabled={pageNum == 1}
              onClick={prevResults}
            >
              {<Icon icon={arrowIconLeft} width={25} />}
            </button>
            <button
              className={`${styles.button} ${
                pageNum == Math.ceil(gamesData.count / 18)
                  ? styles.disabled
                  : ""
              }`}
              disabled={pageNum == Math.ceil(gamesData.count / 18)}
              onClick={nextResults}
            >
              {<Icon icon={arrowIconRight} width={25} />}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetGamesSearch } from "../util/useRequest";

import styles from "../styles/index.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GamesList from "../components/GamesList";
import { Icon, InlineIcon } from "@iconify/react";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

export default function Search() {
  const router = useRouter();
  const { query, page } = router.query;

  const pageSize = 18;
  const { searchData, searchError } = useGetGamesSearch(query, pageSize, page);

  if (searchError) {
    console.error("Could not load game data");
  }

  if (!searchData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Search | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}>
          <h2 className={styles.subHeading}>
            Found 0 results for{" "}
            <span className={styles.searchQuery}>{query}</span>
          </h2>
          <Footer />
        </div>
      </div>
    );
  }

  const prevResults = () => {
    router.push(`/search?query=${query}&page=${parseInt(page) - 1}`);
  };

  const nextResults = () => {
    router.push(`/search?query=${query}&page=${parseInt(page) + 1}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Search | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>
          Found {searchData.count} results for{" "}
          <span className={styles.searchQuery}>{query}</span>
        </h2>
        {[...Array(pageSize / 6).keys()].map((i) => (
          <GamesList
            slideUp={false}
            data={searchData.results.slice(i * 6, i * 6 + 6)}
            key={i}
          />
        ))}
        <div className={styles.pageButtons}>
          <div className={styles.glassButtons}>
            <button
              className={`${styles.button} ${page == 1 ? styles.disabled : ""}`}
              disabled={page == 1}
              onClick={prevResults}
            >
              {<Icon icon={arrowIconLeft} width={25} />}
            </button>
            <button
              className={`${styles.button} ${
                page == Math.ceil(searchData.count / 18) ? styles.disabled : ""
              }`}
              disabled={page == Math.ceil(searchData.count / 18)}
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

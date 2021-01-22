import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

import styles from "../../styles/index.module.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamesList from "../../components/GamesList";
import { Icon, InlineIcon } from "@iconify/react";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Games() {
  const router = useRouter();
  const { page } = router.query;

  const pageNum = page || 1;

  console.log(pageNum);

  const currDate = new Date();
  const {
    data,
    error,
  } = useSWR(
    `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&dates=${
      currDate.getFullYear() - 1
    }-01-01,${currDate
      .toISOString()
      .substr(0, 10)}&page_size=18&page=${pageNum}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    console.error("Could not load game data");
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
        {data ? (
          <>
            <GamesList slideUp={false} data={data.results.slice(0, 6)} />
            <GamesList slideUp={false} data={data.results.slice(6, 12)} />
            <GamesList slideUp={false} data={data.results.slice(12, 18)} />
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
                    pageNum == Math.ceil(data.count / 18) ? styles.disabled : ""
                  }`}
                  disabled={pageNum == Math.ceil(data.count / 18)}
                  onClick={nextResults}
                >
                  {<Icon icon={arrowIconRight} width={25} />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <Footer />
      </div>
    </div>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

import styles from "../styles/index.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GamesList from "../components/GamesList";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Search() {
  const router = useRouter();
  const { query, page } = router.query;

  const {
    data,
    error,
  } = useSWR(
    `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&search=${query}&page_size=18&page=${page}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    console.error("Could not load game data");
  }

  const gamesList1 = !data ? (
    <></>
  ) : (
    <GamesList slideUp={false} data={data.results.slice(0, 6)} />
  );
  const gamesList2 = !data ? (
    <></>
  ) : (
    <GamesList slideUp={false} data={data.results.slice(6, 12)} />
  );
  const gamesList3 = !data ? (
    <></>
  ) : (
    <GamesList slideUp={false} data={data.results.slice(12, 18)} />
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Search | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>
          {data ? `Found ${data.count} ` : "Found 0 "}
          Results For: <span className={styles.searchQuery}>{query}</span>
        </h2>
        {gamesList1}
        {gamesList2}
        {gamesList3}
        <Footer />
      </div>
    </div>
  );
}

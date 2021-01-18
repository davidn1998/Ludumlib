import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

import styles from "../../styles/index.module.scss";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamesList from "../../components/GamesList";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Games() {
  const {
    data,
    error,
  } = useSWR(
    "https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&page_size=6",
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    console.error("Could not load game data");
  }

  const gamesList = !data ? <></> : <GamesList slideUp={true} data={data} />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>Popular Games...</h2>
        {gamesList}
        {gamesList}
        {gamesList}
        {gamesList}
        <Footer />
      </div>
    </div>
  );
}

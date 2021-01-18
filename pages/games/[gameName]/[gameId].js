import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import DefaultErrorPage from "next/error";
import useSWR from "swr";
import axios from "axios";

import styles from "../../../styles/game.module.scss";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Game = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const router = useRouter();
  const { gameId } = router.query;

  const {
    data,
    error,
  } = useSWR(
    `https://api.rawg.io/api/games/${gameId}?key=c2cfee3aa5494adfacb4b77caa093322`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  } else if (data) {
    return (
      <div className={styles.container}>
        <Head>
          <title>{data.name} | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}>
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${data.background_image})` }}
          ></div>
          <h2 className={styles.subHeading}>{data.name}</h2>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Game | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}></div>
      </div>
    );
  }
};

export default Game;

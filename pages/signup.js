import React from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import styles from "../styles/index.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function signup() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}></div>
    </div>
  );
}

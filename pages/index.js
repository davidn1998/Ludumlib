import Head from "next/head";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";

import styles from "../styles/index.module.css";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GameCarousel from "../components/GameCarousel";

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Logo />
        <Navbar />
      </header>
      <div className={styles.main}>
        <Hero />
        <GameCarousel slideUp={true} />
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected(); // Returns true or false

  return {
    props: { isConnected },
  };
}

import Head from "next/head";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";

import styles from "../styles/index.module.css";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GameCarousel from "../components/GameCarousel";
import InfoCard from "../components/InfoCard";
import Gamepad from "../components/SVGIcons/Gamepad";
import LightBulb from "../components/SVGIcons/LightBulb";
import Pencil from "../components/SVGIcons/Pencil";
import Heart from "../components/SVGIcons/Heart";
import List from "../components/SVGIcons/List";
import Graph from "../components/SVGIcons/Graph";
import MainButton from "../components/MainButton";

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
        <div className={styles.infoCards}>
          <InfoCard svgIcon={<Gamepad />} />
          <InfoCard svgIcon={<LightBulb />} />
          <InfoCard svgIcon={<Pencil />} />
        </div>
        <div className={styles.infoCards}>
          <InfoCard svgIcon={<Heart />} />
          <InfoCard svgIcon={<List />} />
          <InfoCard svgIcon={<Graph />} />
        </div>
        <div className={styles.joinButton}>
          <Link href="">
            <MainButton buttonText="JOIN NOW" animated={false} />
          </Link>
        </div>
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

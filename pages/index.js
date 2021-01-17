import Head from "next/head";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";

import styles from "../styles/index.module.scss";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GamesList from "../components/GamesList";
import GameListsList from "../components/GameListsList";
import InfoCard from "../components/InfoCard";
import Gamepad from "../components/SVGIcons/Gamepad";
import LightBulb from "../components/SVGIcons/LightBulb";
import Pencil from "../components/SVGIcons/Pencil";
import Heart from "../components/SVGIcons/Heart";
import List from "../components/SVGIcons/List";
import Graph from "../components/SVGIcons/Graph";
import MainButton from "../components/MainButton";
import MiniReview from "../components/MiniReview";

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
        <GamesList slideUp={true} />
        <div className={styles.infoCards}>
          <InfoCard
            svgIcon={<Gamepad />}
            infoText="Keep track of all the games you’ve played with a personal journal"
          />
          <InfoCard
            svgIcon={<LightBulb />}
            infoText="Get new game recommendations tailored to you"
          />
          <InfoCard
            svgIcon={<Pencil />}
            infoText="Write and read reviews, follow others and expand your network"
          />
        </div>
        <div className={styles.infoCards}>
          <InfoCard
            svgIcon={<Heart />}
            infoText="Rate your favorite games, reviews and lists with a like"
          />
          <InfoCard
            svgIcon={<List />}
            infoText="Create, share and view custom game lists in the community"
          />
          <InfoCard
            svgIcon={<Graph />}
            infoText="Analyze your gaming habits with custom stats based on your games"
          />
        </div>
        <div className={styles.joinButton}>
          <MainButton buttonText="JOIN NOW" animated={false} />
        </div>
        <h2 className={styles.subHeading}>Popular Games...</h2>
        <GamesList slideUp={false} />
        <h2 className={styles.subHeading}>Popular Lists...</h2>
        <GameListsList slideUp={false} />
        <h2 className={styles.subHeading}>Popular Reviews...</h2>
        <div className={styles.miniReviews}>
          <MiniReview
            imgSrc="/images/Fall_Guys_cover.jpg"
            reviewTitle="Fall Guys"
            reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing. Integer vulputate aenean diam nisl, at vitae id sed lorem. Mi ut eget mi aliquam sit neque, in"
            reviewerName="John Smith"
            reviewDate="10/10/2020"
            reviewerIcon="/images/pfp1.png"
            fullStarsNum={4}
            halfStarsNum={1}
          />
          <MiniReview
            imgSrc="/images/control_cover.png"
            reviewTitle="Control"
            reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing"
            reviewerName="Katiieee"
            reviewDate="26/09/2020"
            reviewerIcon="/images/pfp2.png"
            fullStarsNum={4}
            halfStarsNum={0}
          />
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

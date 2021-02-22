import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import { useAuth } from "../util/auth";
import {
  useGetGamesData,
  useGetReviewsData,
  useGetListsData,
} from "../util/useRequest";

import styles from "../styles/index.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";
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
  const auth = useAuth();

  const currDate = new Date();

  const { gamesData, gamesError } = useGetGamesData(
    `${currDate.getFullYear() - 1}-01-01,${currDate
      .toISOString()
      .substr(0, 10)}`,
    12,
    1
  );

  const { reviewsData, reviewsError } = useGetReviewsData("", "", "", 6, 1);

  let reviewComponentsCol1 = [];
  let reviewComponentsCol2 = [];

  [...Array(reviewsData?.reviews?.length).keys()].forEach((i) => {
    if (i % 2 == 0) {
      reviewComponentsCol1.push(
        <MiniReview key={i} reviewData={reviewsData?.reviews[i]} />
      );
    } else {
      reviewComponentsCol2.push(
        <MiniReview key={i} reviewData={reviewsData?.reviews[i]} />
      );
    }
  });

  const { listsData, listsError } = useGetListsData("", "", "", 4, 1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <Hero user={auth.user} />
        {gamesData ? (
          <GamesList slideUp={true} data={gamesData.results.slice(0, 6)} />
        ) : (
          <></>
        )}
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
        {auth.user === false ? (
          <div className={styles.joinButton}>
            <MainButton buttonText="JOIN NOW" animated={false} />
          </div>
        ) : (
          <></>
        )}
        <Link href="/games">
          <a>
            <h2 className={styles.subHeading}>Popular Games</h2>
          </a>
        </Link>
        {gamesData ? (
          <GamesList slideUp={false} data={gamesData.results.slice(6, 12)} />
        ) : (
          <></>
        )}
        <Link href="/lists">
          <a>
            <h2 className={styles.subHeading}>Recent Lists</h2>
          </a>
        </Link>
        <GameListsList slideUp={false} data={listsData?.lists} />
        <Link href="/reviews">
          <a>
            <h2 className={styles.subHeading}>Recent Reviews</h2>
          </a>
        </Link>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{reviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{reviewComponentsCol2}</div>
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

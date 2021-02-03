import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import { useAuth } from "../util/auth";

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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home({ isConnected }) {
  const auth = useAuth();

  const currDate = new Date();
  const {
    data,
    error,
  } = useSWR(
    `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&dates=${
      currDate.getFullYear() - 1
    }-01-01,${currDate.toISOString().substr(0, 10)}&page_size=12`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) {
    console.error("Could not load game data");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <Hero user={auth.user} />
        {data ? (
          <GamesList slideUp={true} data={data.results.slice(0, 6)} />
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
        {data ? (
          <GamesList slideUp={false} data={data.results.slice(6, 12)} />
        ) : (
          <></>
        )}
        <Link href="/games">
          <a>
            <h2 className={styles.subHeading}>Popular Lists</h2>
          </a>
        </Link>
        <GameListsList slideUp={false} />
        <Link href="/games">
          <a>
            <h2 className={styles.subHeading}>Popular Reviews</h2>
          </a>
        </Link>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>
            <MiniReview
              imgURL="/images/Fall_Guys_cover.jpg"
              reviewTitle="Fall Guys"
              reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing. Integer vulputate aenean diam nisl, at vitae id sed lorem. Mi ut eget mi aliquam sit neque, in"
              reviewerName="John Smith"
              reviewDate="10/10/2020"
              reviewerIcon="/images/pfp1.png"
              fullStarsNum={4}
              halfStarsNum={1}
            />
            <MiniReview
              imgURL="/images/control_cover.png"
              reviewTitle="Control"
              reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing"
              reviewerName="Katiieee"
              reviewDate="26/09/2020"
              reviewerIcon="/images/pfp2.png"
              fullStarsNum={4}
              halfStarsNum={0}
            />
          </div>
          <div className={styles.reviewCol}>
            <MiniReview
              imgURL="/images/control_cover.png"
              reviewTitle="Control"
              reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing"
              reviewerName="Katiieee"
              reviewDate="26/09/2020"
              reviewerIcon="/images/pfp2.png"
              fullStarsNum={4}
              halfStarsNum={0}
            />
            <MiniReview
              imgURL="/images/Fall_Guys_cover.jpg"
              reviewTitle="Fall Guys"
              reviewText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum elit justo, mi dignissim id maecenas urna id adipiscing. Integer vulputate aenean diam nisl, at vitae id sed lorem. Mi ut eget mi aliquam sit neque, in"
              reviewerName="John Smith"
              reviewDate="10/10/2020"
              reviewerIcon="/images/pfp1.png"
              fullStarsNum={4}
              halfStarsNum={1}
            />
          </div>
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

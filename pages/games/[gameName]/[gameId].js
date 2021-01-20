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
import MiniReview from "../../../components/MiniReview";

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

  const [isFullAbout, setIsFullAbout] = useState(false);

  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  } else if (data) {
    const fullAbout = (
      <>
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        <button
          className={styles.aboutToggle}
          onClick={() => setIsFullAbout(false)}
        >
          ...LESS
        </button>
      </>
    );

    const smallAbout =
      data.description_raw.length > 500 ? (
        <>
          <div>
            <p>{data.description_raw.substring(0, 500)}...</p>
          </div>
          <button
            className={styles.aboutToggle}
            onClick={() => setIsFullAbout(true)}
          >
            MORE...
          </button>
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </>
      );

    return (
      <div className={styles.container}>
        <Head>
          <title>{data.name} | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${data.background_image_additional})`,
          }}
        ></div>
        <div className={styles.main}>
          <h2 className={styles.heading}>{data.name}</h2>
          {/* <video src={data.trailer}></video> */}
          <div className={styles.section1}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${data.background_image})` }}
            ></div>
            <div className={styles.rightCol}>
              <div className={styles.about}>
                <h3 className={styles.cardTitle}>ABOUT</h3>
                {isFullAbout ? fullAbout : smallAbout}
              </div>
            </div>
          </div>
          <h3 className={styles.heading}>REVIEWS</h3>
          <div className={styles.miniReviews}>
            <div className={styles.reviewCol}>
              <MiniReview
                imgURL={data.background_image}
                reviewTitle="Best Game of the Decade"
                reviewText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae culpa sit expedita iste, nisi nemo vero ullam, amet minus sequi facilis nam numquam tempora accusantium. Sint, distinctio at! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae culpa sit expedita iste, nisi nemo vero ullam, amet minus sequi facilis nam numquam tempora accusantium. Sint, distinctio at! Eveniet?"
                reviewerName="John Smith"
                reviewDate="10/10/2020"
                reviewerIcon="/images/pfp1.png"
                fullStarsNum={4}
                halfStarsNum={1}
              />
            </div>
            <div className={styles.reviewCol}>
              <MiniReview
                imgURL={data.background_image}
                reviewTitle="Endless Fun"
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

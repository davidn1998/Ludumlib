import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "../../../util/auth";

import gameStyles from "../../../styles/game.module.scss";
import styles from "../../../styles/index.module.scss";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MiniReview from "../../../components/MiniReview";
import ReviewGame from "../../../components/ReviewGame";

import { Icon } from "@iconify/react";
import pencilIcon from "@iconify/icons-fa-solid/pencil-alt";
import heartIcon from "@iconify/icons-fa-solid/heart";
import plusIcon from "@iconify/icons-fa-solid/plus";
import ReactTooltip from "react-tooltip";

const Game = () => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const router = useRouter();
  const { gameName, gameId } = router.query;

  const {
    data,
    error,
  } = useSWR(
    `https://api.rawg.io/api/games/${gameId}?key=c2cfee3aa5494adfacb4b77caa093322`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const [isFullAbout, setIsFullAbout] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const auth = useAuth();

  if (error) {
    return <DefaultErrorPage statusCode={404} />;
  } else if (data) {
    const fullAbout = (
      <>
        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        <button
          className={gameStyles.aboutToggle}
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
            className={gameStyles.aboutToggle}
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

    const onLogClick = () => {
      if (!auth.user) {
        router.push(`/login?nextRoute=/games/${gameName}/${gameId}`);
        return;
      }

      console.log("Log Game");
    };
    const onLikeClick = () => {
      if (!auth.user) {
        router.push(`/login?nextName=${gameName}&nextId=${gameId}`);
        return;
      }

      console.log("Like Game");
    };

    const onReviewClick = () => {
      if (!auth.user) {
        router.push(`/login?nextName=${gameName}&nextId=${gameId}`);
        return;
      }

      showReviewModal();
    };

    const showReviewModal = () => {
      setReviewModalVisible(true);
    };
    const hideReviewModal = () => {
      setReviewModalVisible(false);
    };

    return (
      <div className={gameStyles.container}>
        <Head>
          <title>{data.name} | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {data.background_image_additional ? (
          <Image
            layout="fill"
            objectFit="cover"
            className={gameStyles.background}
            src={data.background_image_additional}
            alt={""}
          />
        ) : (
          <></>
        )}
        <div className={gameStyles.main}>
          <div
            className={`${gameStyles.modal} ${
              reviewModalVisible
                ? gameStyles.modalVisible
                : gameStyles.modalHidden
            }`}
          >
            <div className={gameStyles.modalForm}>
              <ReviewGame
                auth={auth}
                hideModal={hideReviewModal}
                gameId={gameId}
              />
            </div>
          </div>
          <h2 className={gameStyles.heading}>{data.name}</h2>
          <div className={gameStyles.section1}>
            <div className={gameStyles.leftCol}>
              <div className={gameStyles.imageContainer}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  className={gameStyles.image}
                  src={
                    data.background_image
                      ? data.background_image
                      : "/images/default_cover.png"
                  }
                  alt={data.name}
                />
              </div>
              <div className={gameStyles.glassButtons}>
                <button
                  className={gameStyles.button}
                  data-tip="Log"
                  data-type="success"
                  onClick={onLogClick}
                >
                  {<Icon icon={plusIcon} width={20} />}
                </button>
                <button
                  className={gameStyles.button}
                  data-tip="Like"
                  data-type="error"
                  onClick={onLikeClick}
                >
                  {<Icon icon={heartIcon} width={20} />}
                </button>
                <button
                  className={gameStyles.button}
                  data-tip="Review"
                  data-type="warning"
                  onClick={onReviewClick}
                >
                  {<Icon icon={pencilIcon} width={20} />}
                </button>
                <ReactTooltip place="bottom" type="light" effect="solid" />
              </div>
            </div>
            <div className={gameStyles.rightCol}>
              <div className={gameStyles.about}>
                <h3 className={gameStyles.cardTitle}>ABOUT</h3>
                {isFullAbout ? fullAbout : smallAbout}
              </div>
            </div>
          </div>
          <h3 className={gameStyles.heading}>REVIEWS</h3>
          <div className={gameStyles.miniReviews}>
            <div className={gameStyles.reviewCol}>
              <MiniReview
                imgURL={
                  data.background_image
                    ? data.background_image
                    : "/images/default_cover.png"
                }
                reviewTitle="Best Game of the Decade"
                reviewText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae culpa sit expedita iste, nisi nemo vero ullam, amet minus sequi facilis nam numquam tempora accusantium. Sint, distinctio at! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repudiandae culpa sit expedita iste, nisi nemo vero ullam, amet minus sequi facilis nam numquam tempora accusantium. Sint, distinctio at! Eveniet?"
                reviewerName="John Smith"
                reviewDate="10/10/2020"
                reviewerIcon="/images/pfp1.png"
                fullStarsNum={4}
                halfStarsNum={1}
              />
            </div>
            <div className={gameStyles.reviewCol}>
              <MiniReview
                imgURL={
                  data.background_image
                    ? data.background_image
                    : "/images/default_cover.png"
                }
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
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={gameStyles.container}>
        <Head>
          <title>Game | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={gameStyles.main}></div>
      </div>
    );
  }
};

export default Game;

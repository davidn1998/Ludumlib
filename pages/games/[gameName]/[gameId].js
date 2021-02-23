import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../util/auth";
import axios from "axios";
import {
  useGetGameData,
  useGetReviewsData,
  useGetUserReviewData,
} from "../../../util/useRequest";

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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
  const [isFullAbout, setIsFullAbout] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const { gameName, gameId } = router.query;

  const { gameData, gameError } = useGetGameData(gameId);
  const { reviewsData, reviewsError } = useGetReviewsData("", gameId);
  const userReviewData = useGetUserReviewData(auth.user?.uid, gameId);

  useEffect(() => {
    setIsLiked(auth.user?.likes && auth.user?.likes.includes(gameId));
    console.log(auth.user?.likes);
  }, [auth.user]);

  if (gameError) {
    return <DefaultErrorPage statusCode={404} />;
  }

  if (!gameData) {
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

  const fullAbout = (
    <>
      <div dangerouslySetInnerHTML={{ __html: gameData.description }}></div>
      <button
        className={styles.aboutToggle}
        onClick={() => setIsFullAbout(false)}
      >
        ...LESS
      </button>
    </>
  );

  const smallAbout =
    gameData.description_raw.length > 500 ? (
      <>
        <div>
          <p>{gameData.description_raw.substring(0, 500)}...</p>
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
        <div dangerouslySetInnerHTML={{ __html: gameData.description }}></div>
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
      router.push(`/login?nextRoute=/games/${gameName}/${gameId}`);
      return;
    }

    auth
      .getIdToken()
      .then((idToken) => {
        if (isLiked) {
          removeLike(idToken);
        } else {
          addLike(idToken);
        }
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  const addLike = (idToken) => {
    axios
      .put(
        `/api/users/${auth.user._id}/likes`,
        {
          game: gameId,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Added to Likes", { position: "bottom-center" });
        setIsLiked(true);
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };

  const removeLike = (idToken) => {
    axios
      .delete(`/api/users/${auth.user._id}/likes`, {
        headers: {
          authorization: `Bearer ${idToken}`,
        },
        data: {
          game: gameId,
        },
      })
      .then((res) => {
        toast.success("Removed from Likes", { position: "bottom-center" });
        setIsLiked(false);
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };

  const onReviewClick = () => {
    if (!auth.user) {
      router.push(`/login?nextRoute=/games/${gameName}/${gameId}`);
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
    <div className={styles.container}>
      <Head>
        <title>{gameData.name} | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {gameData.background_image_additional ? (
        <Image
          layout="fill"
          objectFit="cover"
          className={styles.gameBackground}
          src={gameData.background_image_additional}
          alt={""}
        />
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <div
          className={`${styles.modal} ${
            reviewModalVisible ? styles.modalVisible : styles.modalHidden
          }`}
        >
          <div className={styles.modalBackground}></div>
          <ReviewGame
            auth={auth}
            hideModal={hideReviewModal}
            gameId={gameId}
            reviewData={userReviewData}
          />
        </div>
        <h2 className={styles.subHeading}>{gameData.name}</h2>
        <div className={styles.gameDetails}>
          <div className={styles.leftCol}>
            <div className={styles.imageContainer}>
              <Image
                layout="fill"
                objectFit="cover"
                className={styles.image}
                src={
                  gameData.background_image
                    ? gameData.background_image
                    : "/images/default_cover.png"
                }
                alt={gameData.name}
              />
            </div>
            <div className={styles.glassButtons}>
              <button
                className={styles.button}
                data-tip="Log"
                data-type="success"
                onClick={onLogClick}
              >
                {<Icon icon={plusIcon} width={20} />}
              </button>
              <button
                className={styles.button}
                data-tip={isLiked ? "Remove Like" : "Like"}
                data-type="error"
                onClick={onLikeClick}
              >
                {
                  <Icon
                    icon={heartIcon}
                    width={20}
                    color={isLiked ? "#ff6666" : "#fff"}
                  />
                }
              </button>
              <button
                className={styles.button}
                data-tip={userReviewData ? "Edit Review" : "Review"}
                data-type="warning"
                onClick={onReviewClick}
              >
                {<Icon icon={pencilIcon} width={20} />}
              </button>
              <ReactTooltip place="bottom" type="light" effect="solid" />
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.about}>
              <h3 className={styles.cardTitle}>ABOUT</h3>
              {isFullAbout ? fullAbout : smallAbout}
            </div>
          </div>
        </div>
        <h3 className={styles.subHeading}>REVIEWS</h3>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{reviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{reviewComponentsCol2}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Game;

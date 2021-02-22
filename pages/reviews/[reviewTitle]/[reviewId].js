import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../util/auth";
import {
  useGetReviewData,
  useGetGameData,
  useGetReviewsData,
  useGetUserData,
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
import FullStar from "../../../components/SVGIcons/FullStar";

const Review = () => {
  const [isFullReview, setIsFullReview] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const { reviewTitle, reviewId } = router.query;

  const { reviewData, reviewError } = useGetReviewData(reviewId);
  const { gameData, gameError } = useGetGameData(reviewData?.game);
  const {
    reviewsData: gameReviewsData,
    reviewsError: gameReviewsError,
  } = useGetReviewsData("", reviewData?.game);

  const {
    reviewsData: userReviewsData,
    reviewsError: userReviewsError,
  } = useGetReviewsData(reviewData?.user);
  const { userData, userError } = useGetUserData(reviewData?.user);

  if (reviewError) return <DefaultErrorPage statusCode={404} />;

  if (!reviewData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Review | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}></div>
      </div>
    );
  }

  const userReviews = userReviewsData?.reviews.filter(
    (i) => i._id !== reviewId
  );
  const gameReviews = gameReviewsData?.reviews.filter(
    (i) => i._id !== reviewId
  );

  let userReviewComponentsCol1 = [];
  let userReviewComponentsCol2 = [];

  [...Array(userReviews?.length).keys()].forEach((i) => {
    if (i % 2 == 0) {
      userReviewComponentsCol1.push(
        <MiniReview key={i} reviewData={userReviews?.reviews[i]} />
      );
    } else {
      userReviewComponentsCol2.push(
        <MiniReview key={i} reviewData={userReviews?.reviews[i]} />
      );
    }
  });
  let gameReviewComponentsCol1 = [];
  let gameReviewComponentsCol2 = [];

  [...Array(gameReviews?.length).keys()].forEach((i) => {
    if (i % 2 == 0) {
      gameReviewComponentsCol1.push(
        <MiniReview key={i} reviewData={gameReviews?.reviews[i]} />
      );
    } else {
      gameReviewComponentsCol2.push(
        <MiniReview key={i} reviewData={gameReviews?.reviews[i]} />
      );
    }
  });

  const fullReview = (
    <>
      <div>
        <p>{reviewData.body}</p>
      </div>
      <button
        className={styles.reviewToggle}
        onClick={() => setIsFullReview(false)}
      >
        ...LESS
      </button>
    </>
  );

  const smallReview =
    reviewData.body.length > 300 ? (
      <>
        <div>
          <p>{reviewData.body.substring(0, 300)}...</p>
        </div>
        <button
          className={styles.reviewToggle}
          onClick={() => setIsFullReview(true)}
        >
          MORE...
        </button>
      </>
    ) : (
      <>
        <div>
          <p>{reviewData.body}</p>
        </div>
      </>
    );

  const onReviewClick = () => {
    showReviewModal();
  };

  const showReviewModal = () => {
    setReviewModalVisible(true);
  };
  const hideReviewModal = () => {
    setReviewModalVisible(false);
  };

  const fullStars = [];

  for (let i = 0; i < reviewData.rating; i++) {
    fullStars.push(<FullStar key={i} />);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{reviewData.title} | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {gameData?.background_image_additional ? (
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
            gameId={reviewData.game}
            reviewData={reviewData}
          />
        </div>
        <h2 className={styles.subHeading}>
          {gameData?.name} Review by{" "}
          <Link href={`/user/${userData?.username}`}>
            <a>{userData?.username}</a>
          </Link>
        </h2>
        <div className={styles.gameDetails}>
          <div className={styles.leftCol}>
            <div className={styles.imageContainer}>
              <Link href={`/games/${gameData.slug}/${gameData.id}`}>
                <a>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                    src={
                      gameData?.background_image
                        ? gameData.background_image
                        : "/images/default_cover.png"
                    }
                    alt={gameData?.name}
                  />
                </a>
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {reviewData.user === auth.user?.uid ? (
                <div className={styles.glassButtons} style={{ width: "50%" }}>
                  <button
                    className={styles.button}
                    data-tip="Edit Review"
                    data-type="warning"
                    onClick={onReviewClick}
                  >
                    {<Icon icon={pencilIcon} width={20} />}
                  </button>
                  <ReactTooltip place="bottom" type="light" effect="solid" />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.about}>
              <h3 className={styles.cardTitle}>{reviewData.title}</h3>
              <div>{fullStars}</div>
              {isFullReview ? fullReview : smallReview}
            </div>
          </div>
        </div>
        <h3 className={styles.subHeading}>
          More Reviews From{" "}
          <Link href={`/user/${userData?.username}`}>
            <a>{userData?.username}</a>
          </Link>
        </h3>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{userReviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{userReviewComponentsCol2}</div>
        </div>
        <h3 className={styles.subHeading}>
          More Reviews For{" "}
          <Link href={`/games/${gameData?.slug}/${gameData.id}`}>
            <a>{gameData?.name}</a>
          </Link>
        </h3>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{gameReviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{gameReviewComponentsCol2}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Review;

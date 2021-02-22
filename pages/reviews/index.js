import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetReviewsData } from "../../util/useRequest";

import styles from "../../styles/index.module.scss";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MiniReview from "../../components/MiniReview";

import { Icon, InlineIcon } from "@iconify/react";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

export default function Reviews() {
  const router = useRouter();
  const { page } = router.query;

  const pageNum = page || 1;
  const pageSize = 6;

  const { reviewsData, reviewsError } = useGetReviewsData(
    "",
    "",
    "",
    pageSize,
    pageNum
  );

  if (reviewsError) {
    console.error("Could not load reviews data");
  }

  if (!reviewsData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Reviews | Ludumlib</title>
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

  const prevResults = () => {
    router.push(`/reviews?page=${parseInt(pageNum) - 1}`);
  };

  const nextResults = () => {
    router.push(`/reviews?page=${parseInt(pageNum) + 1}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reviews | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <h2 className={styles.subHeading}>Recent Reviews</h2>
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{reviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{reviewComponentsCol2}</div>
        </div>
        <div className={styles.pageButtons}>
          <div className={styles.glassButtons}>
            <button
              className={`${styles.button} ${
                pageNum == 1 ? styles.disabled : ""
              }`}
              disabled={pageNum == 1}
              onClick={prevResults}
            >
              {<Icon icon={arrowIconLeft} width={25} />}
            </button>
            <button
              className={`${styles.button} ${
                pageNum == Math.ceil(reviewsData.count / pageSize) ||
                reviewsData.count == 0
                  ? styles.disabled
                  : ""
              }`}
              disabled={
                pageNum == Math.ceil(reviewsData.count / pageSize) ||
                reviewsData.count == 0
              }
              onClick={nextResults}
            >
              {<Icon icon={arrowIconRight} width={25} />}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

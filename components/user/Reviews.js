import { useState } from "react";
import styles from "../../styles/index.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { useGetReviewsData } from "../../util/useRequest";

// components
import MiniReview from "../MiniReview";

// UI Icons
import { Icon } from "@iconify/react";
import bookIcon from "@iconify/icons-fa-solid/book";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

const Reviews = ({ user }) => {
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 6;
  const { reviewsData, reviewsError } = useGetReviewsData(
    user?._id,
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
      <div>
        <h1 className={styles.tabHeader}>
          <Icon icon={bookIcon} /> <span>Reviews</span>
        </h1>
      </div>
    );
  }

  const prevResults = () => {
    setPageNum(pageNum - 1);
  };

  const nextResults = () => {
    setPageNum(pageNum + 1);
  };

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

  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={bookIcon} /> <span>Reviews</span>
      </h1>
      {!reviewsData || reviewsData?.reviews?.length == 0 ? (
        <p>No reviews...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Reviews;

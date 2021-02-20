import styles from "../../styles/index.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { useGetReviewsData } from "../../util/useRequest";

// components
import MiniReview from "../MiniReview";

// UI Icons
import { Icon } from "@iconify/react";
import bookIcon from "@iconify/icons-fa-solid/book";

const Reviews = ({ user }) => {
  const { reviewsData, reviewsError } = useGetReviewsData(user?._id);

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
      <h1>
        <Icon icon={bookIcon} /> Reviews
      </h1>
      {reviewsData?.reviews?.length == 0 ? <p>No reviews...</p> : <></>}
      <div className={styles.miniReviews}>
        <div className={styles.reviewCol}>{reviewComponentsCol1}</div>
        <div className={styles.reviewCol}>{reviewComponentsCol2}</div>
      </div>
    </div>
  );
};

export default Reviews;

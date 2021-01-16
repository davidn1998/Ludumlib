import React from "react";
import Link from "next/link";
import styles from "./MiniReview.module.scss";
import FullStar from "./SVGIcons/FullStar";
import HalfStar from "./SVGIcons/HalfStar";

const MiniReview = ({
  reviewTitle,
  reviewText,
  reviewDate,
  reviewerName,
  reviewerIcon,
  imgSrc,
  fullStarsNum,
  halfStarsNum,
}) => {
  const fullStars = [];

  for (let i = 0; i < fullStarsNum; i++) {
    fullStars.push(<FullStar key={i} />);
  }

  return (
    <div className={styles.miniReview}>
      <div className={styles.reviewDetails}>
        <div className={styles.imgContainer}>
          <img src={imgSrc} alt="" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>{reviewTitle}</h2>
          </div>
          <div className={styles.stars}>
            {fullStars}
            {halfStarsNum > 0 ? <HalfStar /> : ""}
          </div>
          <div className={styles.reviewerInfo}>
            <img src={reviewerIcon} alt="" />
            <p>
              <span>{reviewerName}</span> - {reviewDate}
            </p>
          </div>
        </div>
      </div>
      <p>
        {reviewText}{" "}
        <Link href="#">
          <a className={styles.link}>... more</a>
        </Link>
      </p>
    </div>
  );
};

export default MiniReview;

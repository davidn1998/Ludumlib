import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MiniReview.module.scss";
import FullStar from "./SVGIcons/FullStar";
import HalfStar from "./SVGIcons/HalfStar";
import ProfilePic from "./ProfilePic";

const MiniReview = ({
  reviewTitle,
  reviewText,
  reviewDate,
  reviewerName,
  reviewerIcon,
  imgURL,
  fullStarsNum,
  halfStarsNum,
}) => {
  const fullStars = [];

  for (let i = 0; i < fullStarsNum; i++) {
    fullStars.push(<FullStar key={i} />);
  }

  const [isFullReview, setIsFullReview] = useState(false);

  const fullReview = (
    <>
      <div>
        <p>{reviewText}</p>
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
    reviewText.length > 300 ? (
      <>
        <div>
          <p>{reviewText.substring(0, 300)}...</p>
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
          <p>{reviewText}</p>
        </div>
      </>
    );

  return (
    <div className={styles.miniReview}>
      <div className={styles.reviewDetails}>
        <div className={styles.imgContainer}>
          <Image
            layout="fill"
            objectFit="cover"
            className={styles.image}
            src={imgURL}
            alt={""}
          />
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
            <ProfilePic source={reviewerIcon} width="60px" height="60px" />
            <p>
              <span>{reviewerName}</span> - {reviewDate}
            </p>
          </div>
        </div>
      </div>
      {isFullReview ? fullReview : smallReview}
    </div>
  );
};

export default MiniReview;

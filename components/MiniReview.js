import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetGameData, useGetUserData } from "../util/useRequest";
import styles from "./MiniReview.module.scss";
import FullStar from "./SVGIcons/FullStar";
import ProfilePic from "./ProfilePic";

const MiniReview = ({ reviewData }) => {
  const [isFullReview, setIsFullReview] = useState(false);

  const { gameData, gameError } = useGetGameData(reviewData?.game);
  const { userData, userError } = useGetUserData(reviewData?.user);

  if (gameError || !gameData || userError || !userData) {
    return <></>;
  }

  const date = new Date(reviewData.date);

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

  const fullStars = [];

  for (let i = 0; i < reviewData.rating; i++) {
    fullStars.push(<FullStar key={i} />);
  }

  return (
    <div className={styles.miniReview}>
      <div className={styles.reviewDetails}>
        <div className={styles.imgContainer}>
          <Link href={`/games/${gameData.slug}/${gameData.id}`}>
            <a>
              <Image
                layout="fill"
                objectFit="cover"
                className={styles.image}
                src={
                  gameData.background_image
                    ? gameData.background_image
                    : "/images/default_cover.png"
                }
                alt={""}
              />
            </a>
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>
              {" "}
              <Link
                href={`/reviews/${reviewData.title.replace(" ", "-")}/${
                  reviewData._id
                }`}
              >
                <a className={styles.username}>{reviewData.title}</a>
              </Link>
            </h2>
          </div>
          <div className={styles.stars}>{fullStars}</div>
          <div className={styles.reviewerInfo}>
            <Link href={`/user/${userData.username}`}>
              <a>
                <ProfilePic
                  source={
                    userData ? userData.pfp.uri : "/images/default_cover.png"
                  }
                  width="60px"
                  height="60px"
                />
              </a>
            </Link>
            <p>
              <Link href={`/user/${userData.username}`}>
                <a className={styles.username}>{userData.username}</a>
              </Link>
              - {date.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {isFullReview ? fullReview : smallReview}
    </div>
  );
};

export default MiniReview;

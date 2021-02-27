import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GamesList2 from "../GameList2";
import { useGetLogsData, useGetReviewsData } from "../../util/useRequest";
import DiaryEntry from "../DiaryEntry";
import MiniReview from "../MiniReview";
import { useAuth } from "../../util/auth";
import { useRouter } from "next/router";

// UI Icons
import { Icon } from "@iconify/react";
import profileIcon from "@iconify/icons-fa-solid/user";
import gamesIcon from "@iconify/icons-fa-solid/gamepad";

const Profile = ({ user }) => {
  const auth = useAuth();
  const router = useRouter();
  const { logsData, logsError } = useGetLogsData(3, 1, user?._id);
  const { reviewsData, reviewsError } = useGetReviewsData(
    user?._id,
    "",
    "",
    4,
    1
  );

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
        <Icon icon={profileIcon} /> <span>Profile</span>
      </h1>
      <div className={styles.profileBio}>
        {user?.bio && user?.bio.length > 1 ? (
          <>
            <h3 className={styles.cardTitle}>BIO</h3>
            <p>{user.bio}</p>
          </>
        ) : (
          <></>
        )}
        <div className={styles.stats}>
          <h4 className={styles.stat}>{user?.played?.length || 0} Games</h4> |
          <h4 className={styles.stat}>{user?.likes?.length || 0} Likes</h4> |
          <h4 className={styles.stat}>{reviewsData?.count || 0} Reviews</h4>
        </div>
      </div>
      {!user?.played || user?.played?.length < 1 ? (
        <></>
      ) : (
        <>
          <h1 className={styles.subHeading}>
            <div className={styles.profileHeading}>
              <div className={styles.profileTitle}>
                <span>Favourite Games</span>
              </div>
              {auth?.user && auth?.user?.username === user.username ? (
                <div className={styles.glassButtons}>
                  <button
                    className={styles.button}
                    onClick={() => router.push("/settings?tabNum=2")}
                  >
                    Edit Favourite Games
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </h1>
          <GamesList2 games={user.favorites.slice(0, 6)} />
        </>
      )}
      <h1 className={styles.subHeading}>Recent Activity</h1>
      {!logsData || logsError || logsData?.logs.length < 1 ? (
        <p>No Activity...</p>
      ) : (
        <>
          {logsData.logs.map((data) => (
            <DiaryEntry data={data} key={data._id} />
          ))}
        </>
      )}
      <h1 className={styles.subHeading}>Recent Reviews</h1>
      {!reviewsData || reviewsError || reviewsData?.count < 1 ? (
        <p>No Reviews...</p>
      ) : (
        <div className={styles.miniReviews}>
          <div className={styles.reviewCol}>{reviewComponentsCol1}</div>
          <div className={styles.reviewCol}>{reviewComponentsCol2}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;

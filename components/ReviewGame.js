import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/index.module.scss";
import gameStyles from "../styles/game.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-fa-solid/times";
import titleIcon from "@iconify/icons-fa-solid/tag";
import bodyIcon from "@iconify/icons-fa-solid/pencil-ruler";
import star from "@iconify/icons-fa-solid/star";
import ratingIcon from "@iconify/icons-fa-solid/medal";

// Authentication
import { useForm } from "react-hook-form";

const ReviewGame = ({ auth, hideModal, gameId }) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const user = auth.user;

  const onSubmitReview = ({ title, body, rating }) => {
    auth
      .getIdToken()
      .then((idToken) => {
        createReview(title, body, rating, gameId, idToken);
      })
      .then(() => {
        hideModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  // Submit review or show toast error
  const createReview = (title, body, rating, game, idToken) => {
    axios
      .post(
        `/api/reviews`,
        {
          title,
          body,
          rating,
          game,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Review Posted", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      hideModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className={styles.formContainer}>
      {/* Password change Form */}

      <form className={formStyles.form} onSubmit={handleSubmit(onSubmitReview)}>
        <div className={gameStyles.modalCloseButton}>
          <div className={gameStyles.button} onClick={hideModal}>
            <Icon icon={closeIcon} width={20} height={20} />
          </div>
        </div>
        <h2 className={formStyles.heading}>Create Review</h2>
        <h5 className={formStyles.label}>Title</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={titleIcon} />{" "}
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
        </div>
        {errors.title && (
          <p className={formStyles.error}>{errors?.title?.message}</p>
        )}
        <h5 className={formStyles.label}>Body</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={bodyIcon} />{" "}
          </div>
          <textarea
            type="text"
            name="body"
            placeholder="Body"
            rows="5"
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Body is required",
              },
            })}
          />
        </div>
        {errors.body && (
          <p className={formStyles.error}>{errors?.body?.message}</p>
        )}
        <h5 className={formStyles.label}>Rating</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={ratingIcon} />{" "}
          </div>
          <div className={formStyles.rating}>
            <input
              type="radio"
              name="rating"
              value="5"
              id="star5"
              ref={register({
                required: {
                  value: true,
                  message: "Rating is required",
                },
              })}
            />
            <label htmlFor="star5" title="text">
              <Icon icon={star} />
            </label>
            <input
              type="radio"
              name="rating"
              value="4"
              id="star4"
              ref={register({
                required: {
                  value: true,
                  message: "Rating is required",
                },
              })}
            />
            <label htmlFor="star4" title="text">
              <Icon icon={star} />
            </label>
            <input
              type="radio"
              name="rating"
              value="3"
              id="star3"
              ref={register({
                required: {
                  value: true,
                  message: "Rating is required",
                },
              })}
            />
            <label htmlFor="star3" title="text">
              <Icon icon={star} />
            </label>
            <input
              type="radio"
              name="rating"
              value="2"
              id="star2"
              ref={register({
                required: {
                  value: true,
                  message: "Rating is required",
                },
              })}
            />
            <label htmlFor="star2" title="text">
              <Icon icon={star} />
            </label>
            <input
              type="radio"
              name="rating"
              value="1"
              id="star1"
              ref={register({
                required: {
                  value: true,
                  message: "Rating is required",
                },
              })}
            />
            <label htmlFor="star1" title="text">
              <Icon icon={star} />
            </label>
          </div>
        </div>
        {errors.rating && (
          <p className={formStyles.error}>{errors?.rating?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Create Review</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewGame;

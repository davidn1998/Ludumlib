import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import emailIcon from "@iconify/icons-fa-solid/envelope";
import userIcon from "@iconify/icons-fa-solid/user";
import userAltIcon from "@iconify/icons-fa-solid/user-tie";

// Authentication
import { useForm } from "react-hook-form";

const ProfileSettings = ({ auth }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  // Sign In User with firebase or show toast error
  const onSubmit = ({ username, fullname }) => {
    axios
      .put(`api/user/${user._id}/updateSettings`, {
        username,
        fullname,
      })
      .then((res) => {
        console.log(res);
        router.reload();
        toast.success("Profile Updated", { position: "bottom-center" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Username already taken", { position: "bottom-center" });
      });
  };

  return (
    <div className={styles.formContainer}>
      {/* Settings Form */}
      {/* <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      /> */}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={formStyles.heading}>Profile Settings</h2>
        <h5 className={formStyles.label}>Username</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={userIcon} />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={user.username}
            ref={register({
              required: { value: true, message: "Username is required" },
              maxLength: {
                value: 35,
                message: "Username must be less than 36 characters",
              },
            })}
          />
        </div>
        {errors.username && (
          <p className={formStyles.error}>{errors?.username?.message}</p>
        )}
        <h5 className={formStyles.label}>Full Name</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={userAltIcon} />
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            defaultValue={user.fullname}
            ref={register({})}
          />
        </div>
        {errors.fullname && (
          <p className={formStyles.error}>{errors?.fullname?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;

import React, { useState, useEffect } from "react";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import lockUserIcon from "@iconify/icons-fa-solid/user-lock";
import lockIcon from "@iconify/icons-fa-solid/lock";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useForm } from "react-hook-form";

const PasswordSettings = ({ auth }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePassword2Visibility = () => {
    setPassword2Visible(!password2Visible);
  };

  // Change password or show toast error
  const onChangePassword = ({ currPassword, newPassword }, e) => {
    auth
      .updatePassword(currPassword, newPassword)
      .then(() => {
        toast.success("Password Updated", {
          position: "bottom-center",
        });
        e.target.reset();
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  return (
    <div className={styles.formContainer}>
      {/* Password change Form */}
      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onChangePassword)}
      >
        <h2 className={formStyles.heading}>Update Password</h2>
        <h5 className={formStyles.label}>Current Password</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={lockUserIcon} />{" "}
          </div>
          <input
            type={password2Visible ? "text" : "password"}
            name="currPassword"
            placeholder="Current"
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Current password is required",
              },
            })}
          />
          <div
            className={`${formStyles.iconRight} ${formStyles.clickable}`}
            onClick={togglePassword2Visibility}
          >
            <Icon icon={password2Visible ? eyeOpenIcon : eyeClosedIcon} />{" "}
          </div>
        </div>
        {errors.currPassword && (
          <p className={formStyles.error}>{errors?.currPassword?.message}</p>
        )}
        <h5 className={formStyles.label}>New Password</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={lockIcon} />{" "}
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            name="newPassword"
            placeholder="New"
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "New password is required",
              },
            })}
          />
          <div
            className={`${formStyles.iconRight} ${formStyles.clickable}`}
            onClick={togglePasswordVisibility}
          >
            <Icon icon={passwordVisible ? eyeOpenIcon : eyeClosedIcon} />{" "}
          </div>
        </div>
        {errors.newPassword && (
          <p className={formStyles.error}>{errors?.newPassword?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSettings;

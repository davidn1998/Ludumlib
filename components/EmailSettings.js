import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import emailIcon from "@iconify/icons-fa-solid/envelope";
import lockIcon from "@iconify/icons-fa-solid/lock";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useForm } from "react-hook-form";

const EmailSettings = ({ auth }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Sign In User with firebase or show toast error
  const onSubmit = ({ email, password }) => {
    if (email !== user.email) {
      auth
        .updateEmail(email, password)
        .then(() => {
          toast.success("Email Updated", { position: "bottom-center" });
          router.reload();
        })
        .catch((err) => {
          toast.error(err.message, { position: "bottom-center" });
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Settings Form */}
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={formStyles.heading}>Update Email</h2>
        <h5 className={formStyles.label}>Email</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={emailIcon} />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={user.email}
            ref={register({
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email entered",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className={formStyles.error}>{errors?.email?.message}</p>
        )}
        <h5 className={formStyles.label}>Enter password to make changes</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={lockIcon} />{" "}
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Password is required",
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
        {errors.password && (
          <p className={formStyles.error}>{errors?.password?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default EmailSettings;

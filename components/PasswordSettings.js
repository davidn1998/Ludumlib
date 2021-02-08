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
import codeIcon from "@iconify/icons-fa-solid/user-check";
import lockIcon from "@iconify/icons-fa-solid/lock";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useForm } from "react-hook-form";

const PasswordSettings = ({ auth }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });

  // Send password reset email or show toast error
  const onSendResetEmail = ({ email }) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.success(`Reset Code Sent To: ${email}`, {
          position: "bottom-center",
        });
        setResetEmailSent(true);
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  // Change password or show toast error
  // const onChangePassword = ({ code, password }) => {
  //   auth
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       toast.success("Password Updated", {
  //         position: "bottom-center",
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error(err.message, { position: "bottom-center" });
  //     });
  // };

  const sendResetEmailForm = (
    <form onSubmit={handleSubmit(onSendResetEmail)}>
      <h2 className={formStyles.heading}>Change Password</h2>
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
      <div className={formStyles.inputBox}>
        <button type="submit">
          {!resetEmailSent ? "Send Reset Email" : "Resend Email"}
        </button>
      </div>
    </form>
  );

  // const confirmCodeForm = (
  //   <form onSubmit={handleSubmit2(onChangePassword)}>
  //     <h5 className={formStyles.label}>Confirmation Code</h5>
  //     <div className={formStyles.inputBox}>
  //       <div className={formStyles.iconLeft}>
  //         <Icon icon={codeIcon} />
  //       </div>
  //       <input
  //         type="text"
  //         name="code"
  //         placeholder="Code"
  //         ref={register2({
  //           required: {
  //             value: true,
  //             message: "Code is required. Please check your email.",
  //           },
  //         })}
  //       />
  //     </div>
  //     {errors2.code && (
  //       <p className={formStyles.error}>{errors2?.code?.message}</p>
  //     )}
  //     <h5 className={formStyles.label}>New Password</h5>
  //     <div className={formStyles.inputBox}>
  //       <div className={formStyles.iconLeft}>
  //         <Icon icon={lockIcon} />{" "}
  //       </div>
  //       <input
  //         type={passwordVisible ? "text" : "password"}
  //         name="password"
  //         placeholder="Password"
  //         style={{ paddingRight: "3rem" }}
  //         ref={register2({
  //           required: {
  //             value: true,
  //             message: "New password is required",
  //           },
  //         })}
  //       />
  //       <div
  //         className={`${formStyles.iconRight} ${formStyles.clickable}`}
  //         onClick={togglePasswordVisibility}
  //       >
  //         <Icon icon={passwordVisible ? eyeOpenIcon : eyeClosedIcon} />{" "}
  //       </div>
  //     </div>
  //     {errors2.password && (
  //       <p className={formStyles.error}>{errors2?.password?.message}</p>
  //     )}
  //     <div className={formStyles.inputBox}>
  //       <button type="submit">Change Password</button>
  //     </div>
  //   </form>
  // );

  return (
    <div className={styles.formContainer}>
      {/* Settings Form */}
      <div className={formStyles.form}>{sendResetEmailForm}</div>
    </div>
  );
};

export default PasswordSettings;

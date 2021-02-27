import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/index.module.scss";
import formStyles from "../../styles/forms.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-fa-solid/times";
import lockIcon from "@iconify/icons-fa-solid/lock";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useForm } from "react-hook-form";

const DeleteAccount = ({ auth, hideModal }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Change password or show toast error
  const onDeleteAccount = ({ password }) => {
    auth
      .deleteAccount(password)
      .then(() => {
        toast.success("Account Deleted", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center" });
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

      <form
        className={formStyles.form}
        onSubmit={handleSubmit(onDeleteAccount)}
      >
        <div className={styles.modalCloseButton}>
          <div className={styles.button} onClick={hideModal}>
            <Icon icon={closeIcon} width={20} height={20} />
          </div>
        </div>
        <h2 className={formStyles.heading}>Delete Account</h2>
        <p className={formStyles.error}>
          Warning! Once you delete your account, you cannot get it back.
        </p>
        <p className={formStyles.error}>
          Enter your password to confirm you want to delete your account and all
          associated user data.
        </p>
        <h5 className={formStyles.label}>Password</h5>
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
          <button
            className={`${formStyles.formButton} ${formStyles.dangerButton}`}
            type="submit"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;

import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-fa-solid/times";

const DeleteLog = ({ auth, hideModal, logData }) => {
  // Delete or show toast error
  const deleteLog = () => {
    auth
      .getIdToken()
      .then((idToken) => {
        axios
          .delete(`/api/logs/${logData._id}`, {
            headers: {
              authorization: `Bearer ${idToken}`,
            },
          })
          .then((res) => {
            toast.success("Log Deleted", {
              position: "bottom-center",
            });
            hideModal();
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message, {
              position: "bottom-center",
            });
          });
      })
      .catch((err) => {
        console.log(err);
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
      <form className={formStyles.form} onSubmit={deleteLog}>
        <div className={styles.modalCloseButton}>
          <div className={styles.button} onClick={hideModal}>
            <Icon icon={closeIcon} width={20} height={20} />
          </div>
        </div>
        <h2 className={formStyles.heading}>Delete Log</h2>
        <p className={formStyles.error}>
          Are you sure you want to delete this log?
        </p>
        <div className={formStyles.inputBox}>
          <button
            className={`${formStyles.formButton} ${formStyles.dangerButton}`}
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteLog;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/index.module.scss";
import formStyles from "../../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components

// UI Icons
import { Icon } from "@iconify/react";
import connectionIcon from "@iconify/icons-fa-solid/handshake";

// Authentication
import { useForm } from "react-hook-form";

const ConnectionSettings = ({ auth }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();

  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  const onSubmit = ({ connection }) => {
    toast.success(`${connection} Connection Added`, {
      position: "bottom-center",
    });
  };

  return (
    <div className={styles.formContainer}>
      {/* Settings Form */}
      <h1>Connections Coming Soon...</h1>
      {/* <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={formStyles.heading}>Add Connections</h2>
        <h5 className={formStyles.label}>Connection</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={connectionIcon} />
          </div>
          <input
            type="text"
            name="connection"
            placeholder="Connection"
            ref={register({
              required: { value: true, message: "Connection is required" },
            })}
          />
        </div>
        {errors.connection && (
          <p className={formStyles.error}>{errors?.connection?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Save Settings</button>
        </div>
      </form> */}
    </div>
  );
};

export default ConnectionSettings;

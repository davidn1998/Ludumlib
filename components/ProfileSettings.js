import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

// Components
import ProfilePic from "../components/ProfilePic";

// UI Icons
import { Icon } from "@iconify/react";
import userIcon from "@iconify/icons-fa-solid/user";
import userAltIcon from "@iconify/icons-fa-solid/user-tie";

// Authentication
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";

const ProfileSettings = () => {
  const [imageURI, setImageURI] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
  const auth = useAuth();
  const user = auth.user;

  if (!user || user == null) {
    return <></>;
  }

  const readURI = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (ev) => {
        setImageURI(ev.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    if (e.target.files.length == 0) {
      setImageURI(null);
    }
  };

  // Sign In User with firebase or show toast error
  const onSubmit = ({ username, fullname, pfp }) => {
    if (pfp.length > 0) {
      if (pfp[0].size > 5000000) {
        toast.error("Failed to save settings. Max image size (5 MB) exceeded", {
          position: "bottom-center",
        });
        return;
      }

      const file = pfp[0];
      const formData = new FormData();

      const pfpName = uuidv4();

      axios
        .get(`api/user/${user._id}/profilepic`, {
          params: {
            newImage: pfpName,
            oldImage: user.pfp?.name ? user.pfp?.name : null,
          },
        })
        .then((res) => {
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value);
            }
          );

          axios
            .post(res.data.url, formData)
            .then((res) => {
              toast.success("Profile Picture Updated", {
                position: "bottom-center",
              });
            })
            .then(() => {
              const pfpURI = `https://storage.googleapis.com/ludumlib_bucket/profile-pics/${pfpName}.jpg`;
              axios
                .put(`api/user/${user._id}/updateSettings`, {
                  username,
                  fullname,
                  pfp: {
                    name: pfpName,
                    uri: pfpURI,
                  },
                })
                .then((res) => {
                  router.reload();
                  toast.success("Profile Updated", {
                    position: "bottom-center",
                  });
                })
                .catch((err) => {
                  toast.error("Username already taken", {
                    position: "bottom-center",
                  });
                });
            })
            .catch((err) => {
              console.error(err);
              toast.error("Error uploading profile picture.", {
                position: "bottom-center",
              });
            });
        })
        .catch((err) => {
          toast.error("Error uploading profile picture.", {
            position: "bottom-center",
          });
        });
    } else {
      axios
        .put(`api/user/${user._id}/updateSettings`, {
          username,
          fullname,
          pfp: user.pfp,
        })
        .then((res) => {
          router.reload();
          toast.success("Profile Updated", { position: "bottom-center" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Username already taken", { position: "bottom-center" });
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Settings Form */}
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
        <h5 className={formStyles.label}>Profile Picture</h5>
        <div className={formStyles.fileInputBox}>
          <ProfilePic
            source={
              imageURI
                ? imageURI
                : user.pfp.uri
                ? user.pfp.uri
                : "/images/defaultpfp.png"
            }
          />
          <input
            type="file"
            name="pfp"
            accept="image/*"
            onChange={(e) => readURI(e)}
            ref={register({})}
          />
        </div>
        {errors.pfp && (
          <p className={formStyles.error}>{errors?.pfp?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;

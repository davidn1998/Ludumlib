import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "../components/Header";

// UI Icons
import { Icon } from "@iconify/react";
import emailIcon from "@iconify/icons-fa-solid/envelope";
import userIcon from "@iconify/icons-fa-solid/user";
import lockIcon from "@iconify/icons-fa-solid/lock";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();
  const router = useRouter();

  if (auth.user) {
    router.push("/");
  }

  // Sign In User with firebase or show toast error
  const onSubmit = ({ username, email, password }) => {
    axios
      .get(`api/users/${username}`)
      .then(() => {
        auth
          .signup(email, password, username)
          .then(() => {
            router.push("/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error("Username already taken.");
      });
  };

  // Get random background image from RAWG API (based on top 12 games from the past year)
  const getBackgroundImage = () => {
    const currDate = new Date();
    const dataKey = !backgroundImage
      ? `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&dates=${
          currDate.getFullYear() - 1
        }-01-01,${currDate.toISOString().substr(0, 10)}&page_size=12`
      : null;
    const { data: games, error } = useSWR(dataKey, fetcher, {
      revalidateOnFocus: false,
    });

    const { data: game, error: error2 } = useSWR(
      () =>
        `https://api.rawg.io/api/games/${
          games.results[Math.floor(Math.random() * games.results.length)].id
        }?key=c2cfee3aa5494adfacb4b77caa093322`,
      fetcher,
      { revalidateOnFocus: false }
    );

    if (!game) return null;

    return game.background_image;
  };

  const backgroundImageData = getBackgroundImage();

  if (backgroundImageData) {
    setBackgroundImage(backgroundImageData);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* Background Image */}
      {backgroundImage ? (
        <Image
          layout="fill"
          objectFit="cover"
          className={styles.background}
          src={backgroundImage}
          alt={""}
        />
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <div className={styles.formContainer}>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress={undefined}
          />
          <div className={styles.box}>
            {/* Floating squares */}
            <div className={styles.square} style={{ "--i": 0 }}></div>
            <div className={styles.square} style={{ "--i": 1 }}></div>
            <div className={styles.square} style={{ "--i": 2 }}></div>
            <div className={styles.square} style={{ "--i": 3 }}></div>
            <div className={styles.square} style={{ "--i": 4 }}></div>
            {/* Sign up Form */}
            <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
              <h2 className={formStyles.heading}>Sign Up</h2>
              <div className={formStyles.inputBox}>
                <div className={formStyles.iconLeft}>
                  <Icon icon={emailIcon} />
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
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
                <div className={formStyles.iconLeft}>
                  <Icon icon={userIcon} />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
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
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
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
                <button type="submit">Sign Up</button>
              </div>
              <p className={formStyles.extra}>
                By signing up, you agree to Ludumlib’s <br />
                <Link href="/terms">
                  <a>Terms of Service</a>
                </Link>{" "}
                <br />
                and <br />
                <Link href="/privacy-policy">
                  <a> Privacy Policy.</a>
                </Link>
              </p>
              <p className={formStyles.extra}>
                Already have an account?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

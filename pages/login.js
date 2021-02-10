import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR, { cache } from "swr";
import axios from "axios";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "../components/Header";

// UI Icons
import { Icon } from "@iconify/react";
import lockIcon from "@iconify/icons-fa-solid/lock";
import userIcon from "@iconify/icons-fa-solid/user";
import eyeClosedIcon from "@iconify/icons-fa-solid/eye-slash";
import eyeOpenIcon from "@iconify/icons-fa-solid/eye";

// Authentication
import { useAuth } from "../util/auth";
import { useForm } from "react-hook-form";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();
  const router = useRouter();

  const { nextRoute } = router.query;

  if (auth.user) {
    router.push("/");
  }

  // Sign In User with firebase or show toast error
  const onSubmit = ({ email, password }) => {
    auth
      .signin(email, password)
      .then(() => {
        if (nextRoute) {
          router.push(nextRoute);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        toast.error("Failed to login. Username or password is incorrect.", {
          position: "bottom-center",
        });
      });
  };

  // Get random background image from RAWG API (based on top 12 games from the past year)
  const getBackgroundImage = () => {
    const fetcher = (url) => axios.get(url).then((res) => res.data);
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

  if (auth.user === false) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Login | Ludumlib</title>
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
            <ToastContainer />
            <div className={styles.box}>
              {/* Floating squares */}
              <div className={styles.square} style={{ "--i": 0 }}></div>
              <div className={styles.square} style={{ "--i": 1 }}></div>
              <div className={styles.square} style={{ "--i": 2 }}></div>
              <div className={styles.square} style={{ "--i": 3 }}></div>
              <div className={styles.square} style={{ "--i": 4 }}></div>
              {/* Login Form */}
              <form
                className={formStyles.form}
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className={formStyles.heading}>Login</h2>
                <div className={formStyles.inputBox}>
                  <div className={formStyles.iconLeft}>
                    <Icon icon={userIcon} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    ref={register({
                      required: { value: true, message: "Email is required" },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className={formStyles.error}>{errors?.email?.message}</p>
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
                    <Icon
                      icon={passwordVisible ? eyeOpenIcon : eyeClosedIcon}
                    />{" "}
                  </div>
                </div>
                {errors.password && (
                  <p className={formStyles.error}>
                    {errors?.password?.message}
                  </p>
                )}
                <div className={formStyles.inputBox}>
                  <button type="submit">Login</button>
                </div>
                <p className={formStyles.extra}>
                  Forgot your password?{" "}
                  <Link href="/reset-password">
                    <a>Click Here</a>
                  </Link>
                </p>
                <p className={formStyles.extra}>
                  Don't have an account?{" "}
                  <Link href="/signup">
                    <a>Sign Up</a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

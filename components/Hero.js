import React from "react";
import Link from "next/link";

import styles from "../components/Hero.module.scss";

import MainButton from "../components/MainButton";

const Hero = ({ user }) => {
  return (
    <section className={styles.hero}>
      <p id={styles.heroText}>
        Track your games.
        <br />
        Share with the world.
      </p>

      <div className={styles.heroImage}>
        <img
          id={styles.circle}
          src="/images/hero_circle.png"
          alt="hero_circle"
        />
        <img id={styles.gamer} src="/images/hero_gamer.png" alt="hero_gamer" />
        {user ? (
          <p>Welcome {user.email}</p>
        ) : (
          <div className={styles.heroButton}>
            <MainButton buttonText="GET STARTED" animated={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import Link from "next/link";

import styles from "../components/Hero.module.css";

import MainButton from "../components/MainButton";

const Hero = () => {
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
        <MainButton buttonText="GET STARTED" animated={true} />
      </div>
    </section>
  );
};

export default Hero;

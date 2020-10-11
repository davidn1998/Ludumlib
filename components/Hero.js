import React from "react";
import Link from 'next/link'

import styles from "../components/Hero.module.css";

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
        <Link href="">
        <a id={styles.getStarted}>GET STARTED</a>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

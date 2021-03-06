import React from "react";
import Link from "next/link";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="26"
            cy="26"
            r="23.5"
            stroke="url(#paint0_linear)"
            strokeWidth="5"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="26"
              y1="0"
              x2="26"
              y2="52"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#934ED4" />
              <stop offset="1" stopColor="#4458D6" />
            </linearGradient>
          </defs>
        </svg>
        <span className={styles.logoText}>Ludumlib</span>
      </a>
    </Link>
  );
};

export default Logo;

import React from "react";

const Pencil = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75 7.5H15C10.875 7.5 7.5375 10.875 7.5375 15L7.5 82.5L22.5 67.5H75C79.125 67.5 82.5 64.125 82.5 60V15C82.5 10.875 79.125 7.5 75 7.5ZM22.5 52.5V43.2375L48.3 17.4375C49.05 16.6875 50.2125 16.6875 50.9625 17.4375L57.6 24.075C58.35 24.825 58.35 25.9875 57.6 26.7375L31.7625 52.5H22.5ZM67.5 52.5H39.375L46.875 45H67.5V52.5Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="45"
          y1="7.5"
          x2="45"
          y2="82.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#934ED4" />
          <stop offset="1" stopColor="#4458D6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Pencil;

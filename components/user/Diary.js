import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/index.module.scss";
import formStyles from "../../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetReviewsData } from "../../util/useRequest";

// components
import MiniReview from "../MiniReview";

// UI Icons
import { Icon } from "@iconify/react";
import calendarIcon from "@iconify/icons-fa-solid/calendar-alt";

const Diary = ({ user }) => {
  return (
    <div>
      <h1>
        <Icon icon={calendarIcon} /> Diary
      </h1>
    </div>
  );
};

export default Diary;

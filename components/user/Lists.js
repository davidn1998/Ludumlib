import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetListsData } from "../../util/useRequest";
import GameListsList from "../GameListsList";

// UI Icons
import { Icon } from "@iconify/react";
import listIcon from "@iconify/icons-fa-solid/list";

const Lists = ({ user }) => {
  const { listsData, listsError } = useGetListsData(user._id);

  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={listIcon} /> <span>Lists</span>
      </h1>
      <div>
        {listsData?.lists.length > 0 ? (
          [
            ...Array(Math.ceil(listsData?.lists.length > 0 / 4)).keys(),
          ].map((i) => (
            <GameListsList
              data={listsData.lists.slice(i * 4, i * 4 + 4)}
              key={i}
            />
          ))
        ) : (
          <p>No Lists...</p>
        )}
      </div>
    </div>
  );
};

export default Lists;

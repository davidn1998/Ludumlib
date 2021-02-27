import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLogsData } from "../../util/useRequest";
import ManageLog from "../ManageLog";
import DiaryEntry from "../DiaryEntry";

//Authentication
import { useAuth } from "../../util/auth";

// UI Icons
import { Icon } from "@iconify/react";
import calendarIcon from "@iconify/icons-fa-solid/calendar-alt";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

const Diary = ({ user }) => {
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 8;
  const { logsData, logsError } = useGetLogsData(pageSize, pageNum, user._id);
  const auth = useAuth();

  const showLogModal = () => {
    setLogModalVisible(true);
  };
  const hideLogModal = () => {
    setLogModalVisible(false);
  };

  const prevResults = () => {
    setPageNum(pageNum - 1);
  };

  const nextResults = () => {
    setPageNum(pageNum + 1);
  };

  return (
    <div>
      <h1 className={styles.tabHeader}>
        <Icon icon={calendarIcon} /> <span>Diary</span>
      </h1>
      <div style={{ width: "200px", margin: "auto" }}>
        {auth?.user && auth?.user?.username === user.username ? (
          <div className={styles.glassButtons}>
            <button className={styles.button} onClick={showLogModal}>
              Create Entry
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`${styles.modal} ${
          logModalVisible ? styles.modalVisible : styles.modalHidden
        }`}
      >
        <div className={styles.modalBackground}></div>
        <ManageLog auth={auth} hideModal={hideLogModal} />
      </div>
      <div>
        {!logsData || logsData?.logs.length < 1 ? (
          <p>No Entries...</p>
        ) : (
          <>
            {logsData.logs.map((data) => (
              <DiaryEntry data={data} key={data._id} />
            ))}
            <div className={styles.pageButtons}>
              <div className={styles.glassButtons}>
                <button
                  className={`${styles.button} ${
                    pageNum == 1 ? styles.disabled : ""
                  }`}
                  disabled={pageNum == 1}
                  onClick={prevResults}
                >
                  {<Icon icon={arrowIconLeft} width={25} />}
                </button>
                <button
                  className={`${styles.button} ${
                    pageNum == Math.ceil(logsData.count / pageSize) ||
                    logsData.count == 0
                      ? styles.disabled
                      : ""
                  }`}
                  disabled={
                    pageNum == Math.ceil(logsData.count / pageSize) ||
                    logsData.count == 0
                  }
                  onClick={nextResults}
                >
                  {<Icon icon={arrowIconRight} width={25} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Diary;

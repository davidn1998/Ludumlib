import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetListsData } from "../../util/useRequest";

import styles from "../../styles/index.module.scss";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MiniReview from "../../components/MiniReview";
import GameListsList from "../../components/GameListsList";
import CreateList from "../../components/CreateList";

import { Icon, InlineIcon } from "@iconify/react";
import arrowIconRight from "@iconify/icons-fa-solid/arrow-right";
import arrowIconLeft from "@iconify/icons-fa-solid/arrow-left";

// Authentication
import { useAuth } from "../../util/auth";

export default function Lists() {
  const router = useRouter();
  const auth = useAuth();
  const [createListModalVisible, setCreateListModalVisible] = useState(false);
  const { page } = router.query;

  const pageNum = page || 1;
  const pageSize = 16;

  const { listsData, listsError } = useGetListsData("", "", pageSize, page);

  if (listsError) {
    console.error("Could not load lists data");
  }

  if (!listsData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Lists | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}></div>
      </div>
    );
  }

  const prevResults = () => {
    router.push(`/lists?page=${parseInt(pageNum) - 1}`);
  };

  const nextResults = () => {
    router.push(`/lists?page=${parseInt(pageNum) + 1}`);
  };

  const onCreateListClick = () => {
    if (!auth.user) {
      router.push(`/login?nextRoute=/lists`);
      return;
    }

    showCreateListModal();
  };

  const showCreateListModal = () => {
    setCreateListModalVisible(true);
  };
  const hideCreateListModal = () => {
    setCreateListModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lists | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.main}>
        <div
          className={`${styles.modal} ${
            createListModalVisible ? styles.modalVisible : styles.modalHidden
          }`}
        >
          <div className={styles.modalBackground}></div>
          <CreateList auth={auth} hideModal={hideCreateListModal} />
        </div>
        <h2 className={styles.subHeading}>
          <div className={styles.profileHeading}>
            <div>Recent Lists</div>
            <div className={styles.glassButtons}>
              <button className={styles.button} onClick={onCreateListClick}>
                Create List
              </button>
            </div>
          </div>
        </h2>
        {[...Array(Math.ceil(pageSize / 4)).keys()].map((i) => (
          <GameListsList
            data={listsData.lists.slice(i * 4, i * 4 + 4)}
            key={i}
          />
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
                pageNum == Math.ceil(listsData.count / pageSize) ||
                listsData.count == 0
                  ? styles.disabled
                  : ""
              }`}
              disabled={
                pageNum == Math.ceil(listsData.count / pageSize) ||
                listsData.count == 0
              }
              onClick={nextResults}
            >
              {<Icon icon={arrowIconRight} width={25} />}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

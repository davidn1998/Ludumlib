import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DefaultErrorPage from "next/error";
import { useAuth } from "../../../util/auth";
import {
  useGetListData,
  useGetGameData,
  useGetListsData,
  useGetUserData,
} from "../../../util/useRequest";

import styles from "../../../styles/index.module.scss";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CreateList from "../../../components/CreateList";
import GamesList2 from "../../../components/GameList2";
import GameListsList from "../../../components/GameListsList";

import { Icon } from "@iconify/react";
import pencilIcon from "@iconify/icons-fa-solid/pencil-alt";
import heartIcon from "@iconify/icons-fa-solid/heart";
import plusIcon from "@iconify/icons-fa-solid/plus";
import ReactTooltip from "react-tooltip";

const List = () => {
  const [editListModalVisible, setEditListModalVisible] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const { listTitle, listId } = router.query;

  const { listData, listError } = useGetListData(listId);
  const { gameData, gameError } = useGetGameData(listData?.games[0].value);
  const { userData, userError } = useGetUserData(listData?.user);
  const {
    listsData: userListsData,
    listsError: userListsError,
  } = useGetListsData(listData?.user);

  if (listError) return <DefaultErrorPage statusCode={404} />;

  if (!listData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>List | Ludumlib</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className={styles.main}></div>
      </div>
    );
  }

  const userLists = userListsData?.lists.filter((i) => i._id !== listId);

  const onEditListClick = () => {
    if (!auth.user) {
      router.push(`/login?nextRoute=/lists`);
      return;
    }

    showEditListModal();
  };

  const showEditListModal = () => {
    setEditListModalVisible(true);
  };
  const hideEditListModal = () => {
    setEditListModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{listData.title} | Ludumlib</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {gameData?.background_image_additional ? (
        <Image
          layout="fill"
          objectFit="cover"
          className={styles.gameBackground}
          src={gameData.background_image_additional}
          alt={""}
        />
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <div
          className={`${styles.modal} ${
            editListModalVisible ? styles.modalVisible : styles.modalHidden
          }`}
        >
          <div className={styles.modalBackground}></div>
          <CreateList
            auth={auth}
            hideModal={hideEditListModal}
            listData={listData}
          />
        </div>
        <h2 className={styles.subHeading}>
          <div className={styles.profileHeading}>
            <div>
              List by{" "}
              <Link href={`/user/${userData?.username}`}>
                <a>{userData?.username}</a>
              </Link>
            </div>
            {listData.user === auth.user?.uid ? (
              <div className={styles.glassButtons}>
                <button className={styles.button} onClick={onEditListClick}>
                  Edit List
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </h2>
        <div className={styles.listDetails}>
          <div className={styles.about}>
            <h3 className={styles.cardTitle}>{listData.title}</h3>
            <p>{listData.description}</p>
          </div>
          {[...Array(Math.ceil(listData.games.length / 6)).keys()].map((i) => (
            <GamesList2
              games={listData.games.slice(i * 6, i * 6 + 6)}
              key={i}
            />
          ))}
        </div>
        <h3 className={styles.subHeading}>
          More Lists From{" "}
          <Link href={`/user/${userData?.username}`}>
            <a>{userData?.username}</a>
          </Link>
        </h3>
        {userLists ? (
          [...Array(Math.ceil(userLists?.length / 4)).keys()].map((i) => (
            <GameListsList data={userLists.slice(i * 4, i * 4 + 4)} key={i} />
          ))
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default List;

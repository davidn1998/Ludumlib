import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/index.module.scss";
import formStyles from "../styles/forms.module.scss";
import axios from "axios";
import { useGetGamesSearch } from "../util/useRequest";
import _ from "lodash";

// Components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// UI Icons
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-fa-solid/times";
import titleIcon from "@iconify/icons-fa-solid/tag";
import bodyIcon from "@iconify/icons-fa-solid/pencil-ruler";
import gameIcon from "@iconify/icons-fa-solid/gamepad";

// Form
import { useForm, Controller } from "react-hook-form";

const CreateList = ({ auth, hideModal, listData }) => {
  const [gameSearch, setGameSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { register, handleSubmit, control, errors } = useForm({
    // defaultValues,
  });

  const router = useRouter();

  const showLoadingIcon = () => {
    setLoadingSearch(true);
  };

  const searchGame = (searchQuery) => {
    setLoadingSearch(false);
    setGameSearch(searchQuery);
  };

  const searchGameDebounced = useRef(_.debounce(searchGame, 1000));
  const showLoadingDebounced = useRef(_.debounce(showLoadingIcon, 100));

  const handleGameSearch = (input) => {
    if (input.length > 0) {
      showLoadingDebounced.current();
    }
    searchGameDebounced.current(input);
  };

  const { searchData, searchError } = useGetGamesSearch(gameSearch, 5, 1);

  const gameOptions = searchData?.results.map((game) => {
    return { value: game.id, label: game.name };
  });

  const onSubmitList = ({ title, description, games }) => {
    auth
      .getIdToken()
      .then((idToken) => {
        listData
          ? updateList(title, description, games, listData._id, idToken)
          : createList(title, description, games, idToken);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  // Submit list or show toast error
  const createList = (title, description, games, idToken) => {
    axios
      .post(
        `/api/lists`,
        {
          title,
          description,
          games,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("List Posted", {
          position: "bottom-center",
        });
        hideModal();
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };
  // Update list or show toast error
  const updateList = (title, description, games, listId, idToken) => {
    axios
      .put(
        `/api/lists/${listId}`,
        {
          title,
          description,
          games,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("List Updated", {
          position: "bottom-center",
        });
        hideModal();
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };
  // Delete list or show toast error
  const deleteList = () => {
    auth
      .getIdToken()
      .then((idToken) => {
        axios
          .delete(`/api/lists/${listData._id}`, {
            headers: {
              authorization: `Bearer ${idToken}`,
            },
          })
          .then((res) => {
            toast.success("List Deleted", {
              position: "bottom-center",
            });
            hideModal();
            router.reload();
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message, {
              position: "bottom-center",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      hideModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const gameSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      color: "#fff",
      border: "none",
      paddingLeft: "2rem",
      width: "300px",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "rgba(255, 255, 255, 0.5)",
      fontWeight: "600",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "#fff"
          : isFocused
          ? "#000"
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? "#000"
          : isFocused
          ? "#fff"
          : "#000",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled && (isSelected ? "#fff" : "#fff"),
        },
      };
    },
  };

  return (
    <div className={styles.formContainer}>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmitList)}>
        <div className={styles.modalCloseButton}>
          <div className={styles.button} onClick={hideModal}>
            <Icon icon={closeIcon} width={20} height={20} />
          </div>
        </div>
        <h2 className={formStyles.heading}>
          {listData ? "Edit List" : "Create List"}
        </h2>
        <h5 className={formStyles.label}>Title</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={titleIcon} />{" "}
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={listData?.title || ""}
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
        </div>
        {errors.title && (
          <p className={formStyles.error}>{errors?.title?.message}</p>
        )}
        <h5 className={formStyles.label}>Description (Optional)</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={bodyIcon} />{" "}
          </div>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={listData?.description || ""}
            rows="5"
            style={{ paddingRight: "3rem" }}
            ref={register()}
          />
        </div>
        {errors.description && (
          <p className={formStyles.error}>{errors?.description?.message}</p>
        )}
        <h5 className={formStyles.label}>Games</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={gameIcon} />{" "}
          </div>
          <div className={formStyles.games}>
            <Controller
              name="games"
              control={control}
              defaultValue={listData?.games || null}
              as={<Select />}
              rules={{
                validate: (value) =>
                  value?.length > 2 || "At least 3 games are required",
              }}
              isMulti
              options={gameOptions}
              styles={gameSelectStyles}
              onInputChange={(input) => handleGameSearch(input)}
              placeholder="Search for games..."
            />
          </div>
          <div style={{ width: "100%" }}>
            <ClipLoader loading={loadingSearch} color="#fff" />
          </div>
        </div>
        {errors.games && (
          <p className={formStyles.error}>{errors?.games?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button type="submit">
            {listData ? "Save Changes" : "Create List"}
          </button>
        </div>
        {listData ? (
          <div className={formStyles.inputBox}>
            <button
              onClick={deleteList}
              type="reset"
              className={formStyles.dangerButton}
            >
              Delete List
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default CreateList;

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/index.module.scss";
import formStyles from "../../styles/forms.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetGamesSearch } from "../../util/useRequest";
import _, { update } from "lodash";

// Components
import Select from "react-select";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// UI Icons
import { Icon } from "@iconify/react";
import gameIcon from "@iconify/icons-fa-solid/gamepad";

// Authentication
import { useForm, Controller } from "react-hook-form";

const FavouriteSettings = ({ auth }) => {
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

  const onSubmit = ({ games }) => {
    auth
      .getIdToken()
      .then((idToken) => {
        updateFavorites(games, idToken);
      })
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  const updateFavorites = (games, idToken) => {
    axios
      .put(
        `api/users/${auth.user?._id}/favorites`,
        {
          favorites: games,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        router.reload();
        toast.success("Favorites Updated", { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };

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
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={formStyles.heading}>Add Favourite Games</h2>
        <p>Add up to 5 favourite games to display on your profile.</p>
        <h5 className={formStyles.label}>Games</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={gameIcon} />{" "}
          </div>
          <div className={formStyles.games}>
            <Controller
              name="games"
              control={control}
              key={auth.user?._id}
              defaultValue={auth.user?.favorites || null}
              as={<Select />}
              rules={{
                validate: (value) =>
                  value?.length < 6 || "You can add at most 5 favourite games.",
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
          <button type="submit" className={formStyles.formButton}>
            Save Games
          </button>
        </div>
      </form>
    </div>
  );
};

export default FavouriteSettings;

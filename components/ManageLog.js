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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// UI Icons
import { Icon } from "@iconify/react";
import closeIcon from "@iconify/icons-fa-solid/times";
import dateIcon from "@iconify/icons-fa-solid/calendar";
import hoursIcon from "@iconify/icons-fa-solid/clock";
import gameIcon from "@iconify/icons-fa-solid/gamepad";

// Form
import { useForm, Controller } from "react-hook-form";

const ManageLog = ({ auth, hideModal, logData, inGame }) => {
  const [playDate, setPlayDate] = useState(new Date());
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

  const onSubmitLog = ({ game, hours, date }) => {
    auth
      .getIdToken()
      .then((idToken) => {
        logData
          ? updateLog(game, hours, date, logData._id, idToken)
          : createLog(
              inGame ? { value: inGame.id, label: inGame.name } : game,
              hours,
              date,
              idToken
            );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: "bottom-center" });
      });
  };

  // Submit log or show toast error
  const createLog = (game, hours, date, idToken) => {
    axios
      .post(
        `/api/logs`,
        {
          game,
          hours,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Log Posted", {
          position: "bottom-center",
        });
        hideModal();
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };
  // Update log or show toast error
  const updateLog = (game, hours, date, logId, idToken) => {
    axios
      .put(
        `/api/logs/${logId}`,
        {
          game,
          hours,
          date,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Log Updated", {
          position: "bottom-center",
        });
        hideModal();
        router.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "bottom-center" });
      });
  };
  // Delete log or show toast error
  const deleteLog = () => {
    auth
      .getIdToken()
      .then((idToken) => {
        axios
          .delete(`/api/logs/${logData._id}`, {
            headers: {
              authorization: `Bearer ${idToken}`,
            },
          })
          .then((res) => {
            toast.success("Log Deleted", {
              position: "bottom-center",
            });
            hideModal();
            router.push("/logs");
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
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmitLog)}>
        <div className={styles.modalCloseButton}>
          <div className={styles.button} onClick={hideModal}>
            <Icon icon={closeIcon} width={20} height={20} />
          </div>
        </div>
        <h2 className={formStyles.heading}>
          {logData ? "Edit Log" : "Create Log"}
        </h2>
        <h5 className={formStyles.label}>Date</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={dateIcon} />{" "}
          </div>
          <div className={formStyles.date}>
            <Controller
              name="date"
              control={control}
              key={logData?._id}
              defaultValue={logData?.date || null}
              render={({ onChange, value }) => (
                <DatePicker
                  selected={value || logData?.date || null}
                  onChange={onChange}
                  autoComplete="off"
                  placeholderText="Select Date"
                  wrapperClassName={formStyles.datePicker}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Date is required",
                },
              }}
            />
          </div>
        </div>
        {errors.date && (
          <p className={formStyles.error}>{errors?.date?.message}</p>
        )}{" "}
        {!inGame ? (
          <>
            <h5 className={formStyles.label}>Game</h5>
            <div className={formStyles.inputBox}>
              <div className={formStyles.iconLeft}>
                <Icon icon={gameIcon} />{" "}
              </div>
              <div className={formStyles.games}>
                <Controller
                  name="game"
                  control={control}
                  key={logData?._id}
                  isClearable
                  defaultValue={logData?.games || null}
                  as={<Select />}
                  rules={{
                    required: {
                      value: true,
                      message: "Game is required",
                    },
                  }}
                  options={gameOptions}
                  styles={gameSelectStyles}
                  onInputChange={(input) => handleGameSearch(input)}
                  placeholder="Search for a game..."
                />
              </div>
              <div style={{ width: "100%" }}>
                <ClipLoader loading={loadingSearch} color="#fff" />
              </div>
            </div>
            {errors.game && (
              <p className={formStyles.error}>{errors?.game?.message}</p>
            )}{" "}
          </>
        ) : (
          <></>
        )}
        <h5 className={formStyles.label}>Hours Played</h5>
        <div className={formStyles.inputBox}>
          <div className={formStyles.iconLeft}>
            <Icon icon={hoursIcon} />{" "}
          </div>
          <input
            type="number"
            name="hours"
            placeholder="Hours Played"
            key={logData?._id}
            defaultValue={logData?.hours || null}
            style={{ paddingRight: "3rem" }}
            ref={register({
              required: {
                value: true,
                message: "Hours played is required",
              },
            })}
          />
        </div>
        {errors.hours && (
          <p className={formStyles.error}>{errors?.hours?.message}</p>
        )}
        <div className={formStyles.inputBox}>
          <button className={formStyles.formButton} type="submit">
            {logData ? "Save Changes" : "Create Log"}
          </button>
        </div>
        {logData ? (
          <div className={formStyles.inputBox}>
            <button
              onClick={deleteLog}
              type="reset"
              className={`${formStyles.formButton} ${formStyles.dangerButton}`}
            >
              Delete Log
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default ManageLog;

import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchBar.module.scss";
import { Icon, InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-fa-solid/search";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    router.push(`/search?query=${searchInput}&page=1`);
  };

  return (
    <div className={styles.searchBar}>
      <form action="">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={(e) => submitForm(e)}>
          <Icon icon={searchIcon} />{" "}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

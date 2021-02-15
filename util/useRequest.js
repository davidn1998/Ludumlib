import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useGetGameData = (gameId) => {
  const url = gameId
    ? `https://api.rawg.io/api/games/${gameId}?key=c2cfee3aa5494adfacb4b77caa093322`
    : "";

  const { data: gameData, error: gameError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return { gameData, gameError };
};

export const useGetGamesData = (dateRange, pageSize, pageNum) => {
  const url = `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&dates=${dateRange}&page_size=${pageSize}&page=${pageNum}`;

  const { data: gamesData, error: gamesError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return { gamesData, gamesError };
};

export const useGetGamesSearch = (searchQuery, pageSize, pageNum) => {
  const url = `https://api.rawg.io/api/games?key=c2cfee3aa5494adfacb4b77caa093322&search=${searchQuery}&page_size=${pageSize}&page=${pageNum}`;

  const { data: searchData, error: searchError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return { searchData, searchError };
};

export const useGetReviewsData = (
  user = "",
  game = "",
  rating = "",
  pageSize = 18,
  page = 1
) => {
  const url = `/api/reviews?page=${page}&pageSize=${pageSize}&user=${user}&game=${game}&rating=${rating}`;

  const { data: reviewsData, error: reviewsError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return { reviewsData, reviewsError };
};

export const useGetUserData = (userId = "", username = "") => {
  const url =
    userId.length > 0
      ? `/api/users/${userId}`
      : `/api/users?username=${username}`;

  const { data: userData, error: userError } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return { userData, userError };
};

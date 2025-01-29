import { axiosInstance } from "./axiosInstace";

export const searchMovies = async ({ query }) => {
  try {
    const movies = await axiosInstance.get("search/movie?query=" + query);
    return movies.data.results;
  } catch (err) {
    console.log(err);
  }
};

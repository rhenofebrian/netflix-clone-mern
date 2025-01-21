import { axiosInstance } from "./axiosInstace";

export const getMoviesByType = async ({ moviesType }) => {
  try {
    const movies = await axiosInstance.get("movie/" + moviesType);
    console.log("API RESPONSE:", movies);
    return movies.data.results;
  } catch (err) {
    console.log(err);
  }
};

import { axiosInstance } from "./axiosInstace";

export const getMovieDetail = async ({ movie_id }) => {
  try {
    const movie = await axiosInstance.get("movie/" + movie_id);
    console.log("API RESPONSE:", movie);
    return movie.data;
  } catch (err) {
    console.log(err);
  }
};

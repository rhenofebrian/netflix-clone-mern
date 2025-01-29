import { axiosInstance } from "./axiosInstace";

const getMovieRecommendation = async ({ movie_id }) => {
  try {
    const movies = await axiosInstance(
      "movie/" + movie_id + "/recommendations"
    );
    return movies.data.results;
  } catch (err) {
    console.log(err);
  }
};

export default getMovieRecommendation;

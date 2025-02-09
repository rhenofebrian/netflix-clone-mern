import { axiosInstanceExpress } from "./axiosInstace";

export const checkFavoriteMovies = async ({
  emailStorage,
  tokenStorage,
  idMovie,
}) => {
  try {
    const isFavorited = await axiosInstanceExpress.post("my-movies/check", {
      email: emailStorage,
      token: tokenStorage,
      movieId: idMovie,
    });
    if (isFavorited.status === 200) {
      return isFavorited.data.data.isFavorited;
    }
  } catch (err) {
    console.log(err);
  }
};

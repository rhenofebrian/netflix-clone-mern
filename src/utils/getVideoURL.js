import { axiosInstance } from "./axiosInstace";

export const getVideoURL = async ({ movie_id }) => {
  try {
    const url = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL_TMDB}movie/${movie_id}/videos`
    );
    const videos = url.data.results;
    if (!videos || videos.length === 0) {
      console.warn(`no video for movie_id: ${movie_id}`);
      return null;
    }
    return videos[0].key;
  } catch (err) {
    console.log(err);
  }
};

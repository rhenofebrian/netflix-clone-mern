import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { GoChevronDown, GoPlay, GoPlusCircle, GoTrash } from "react-icons/go";
import ReactPlayer from "react-player";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenAtom,
} from "../../jotai/atoms";
import { getVideoURL } from "../../utils/getVideoURL";
import { useEffect, useState } from "react";
import Skeleton from "../Modules/Skeleton";
import { useNavigate } from "react-router-dom";
import { axiosInstanceExpress } from "../../utils/axiosInstace";
import Notification from "../Modules/Notification";
import { checkFavoriteMovies } from "../../utils/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover, moviesType }) => {
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFetching] = useAtom(isFetchingAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isAdd, setIsAdd] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [movieTypeState, setMovieTypeState] = useState(null);
  const navigate = useNavigate();

  const handleAddFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;

    try {
      setIsAdd(true);
      const addMovie = await axiosInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data,
      });
      if (addMovie.status !== 201)
        return setNotifMessage("failed to add movie");

      setNotifMessage(`${data.title} just added to your favorite list`);
      setIsFavorited(true);

      setTimeout(() => {
        setIsAdd(false);
        setNotifMessage(null);
      }, 2000);
    } catch (err) {
      setNotifMessage(`${err.message}`);
      setTimeout(() => {
        setIsAdd(false);
        setNotifMessage(null);
      }, 2000);
    }
  };

  const handleRemoveFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsAdd(true);
      const removeMovie = await axiosInstanceExpress.delete("my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieId: data.id,
        },
      });
      if (removeMovie.status !== 204)
        return setNotifMessage("failed to remove movie from favorite");
      setNotifMessage(`${data.title} just removed from your favorite list`);
      setIsFavorited(false);

      setTimeout(() => {
        setIsAdd(false);
        setNotifMessage(null);
      }, 2000);
    } catch (err) {
      setNotifMessage(err.message);
      setTimeout(() => {
        setIsAdd(false);
        setNotifMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (idMovie && data && isHover) {
      const fetchUrl = async () => {
        try {
          const res = await getVideoURL({ movie_id: data.id });
          if (res) {
            setVideoUrl(`https://youtube.com/watch?v=${res}`);
          } else {
            setVideoUrl(null);
          }
          setVideoUrl(res);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUrl();
    }
  }, [idMovie, data, isHover]);

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isAdd && notifMessage && <Notification message={notifMessage} />}

      {isHover && idMovie == data.id && moviesType === movieTypeState ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="relative shadow-md transition-all w-full"
        >
          <div className="hover:scale-110 transition-all">
            <ReactPlayer
              url={videoUrl ? `https://youtube.com/watch?v=${videoUrl}` : null}
              playing={true}
              loop={true}
              muted={true}
              width={"100%"}
              height={"180px"}
              controls={false}
            />
          </div>

          <div className="flex flex-col gap-1.5 h-auto p-4 bg-[#141414] rounded-b-xl">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2">
                <button
                  className="text-white hover:text-[#323232]"
                  onClick={() => navigate("/watch/" + videoUrl)}
                >
                  <GoPlay size={32} />
                </button>
                <button
                  onClick={
                    isFavorited
                      ? handleRemoveFavoriteMovie
                      : handleAddFavoriteMovie
                  }
                  className="text-white hover:text-[#323232]"
                >
                  {isFavorited ? (
                    <GoTrash size={32} />
                  ) : (
                    <GoPlusCircle size={32} />
                  )}
                </button>
              </div>
              <div>
                <button
                  className="rounded-full p-1 border text-white"
                  onClick={() => setIsOpenModal(true)}
                >
                  <GoChevronDown size={20} />
                </button>
              </div>
            </section>
            <section className="text-left">
              <h2 className="font-semibold text-white">{data.title}</h2>
              <p className="text-green-400">Popularity: {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) : (
        <img
          onMouseEnter={() => {
            setIsHover(true);
            setIdMovie(data.id);
            checkFavoriteMovies({
              emailStorage,
              tokenStorage,
              idMovie: data.id,
            }).then((result) => setIsFavorited(result));
            setMovieTypeState(moviesType);
          }}
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className="w-full max-h-72 cursor-pointer object-cover rounded-xl"
        />
      )}
    </>
  );
};

export default MovieCard;

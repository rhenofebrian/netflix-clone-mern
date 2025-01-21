import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { GoChevronDown, GoPlay, GoPlusCircle } from "react-icons/go";
import ReactPlayer from "react-player";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import { getVideoURL } from "../../utils/getVideoURL";
import { useEffect, useState } from "react";

const MovieCard = ({ data, isHover, setIsHover }) => {
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [videoUrl, setVideoUrl] = useState([[]]);

  const fetchUrl = async () => {
    try {
      const res = await getVideoURL({ movie_id: data.id });
      setVideoUrl(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <>
      {isHover && idMovie == data.id ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="relative shadow-md cursor-pointer transition-all w-full"
        >
          <ReactPlayer
            url={`https://youtube.com/watch?v=${videoUrl}`}
            playing={true}
            loop={true}
            muted={true}
            width={"100%"}
            height={"auto"}
            controls={false}
          />
          <div className="flex flex-col gap-1.5 h-auto p-2 bg-[#141414]">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2">
                <button className="text-white">
                  <GoPlay size={32} />
                  Play
                </button>
                <button className="text-white">
                  <GoPlusCircle size={32} /> Add
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
          }}
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className="w-full max-h-48 cursor-pointer"
        />
      )}
    </>
  );
};

export default MovieCard;

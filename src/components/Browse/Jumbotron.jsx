import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { GoMute, GoPlay, GoUnmute } from "react-icons/go";
import { getMoviesByType } from "../../utils/getMoviesByType";
import { useAtom } from "jotai";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import { getVideoURL } from "../../utils/getVideoURL";
import { useNavigate } from "react-router-dom";

const Jumbotron = () => {
  const navigate = useNavigate();

  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isMuted, setIsMuted] = useState(true);
  const [idMovie, setIdMovie] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [, setIdMovieAtom] = useAtom(idMovieAtom);

  useEffect(() => {
    getMoviesByType({ moviesType: "top_rated" })
      .then((result) => {
        setTopMovies(result[0]);
        const movieId = result[0].id;
        setIdMovie(movieId);
        return getVideoURL({ movie_id: movieId });
      })
      .then((result) => setVideoUrl(result));
  }, []);

  return (
    <div className="relative h-[500px] w-full">
      <ReactPlayer
        url={"https://youtube.com/watch?v=" + videoUrl}
        width={"100%"}
        height={"700px"}
        playing={true}
        muted={isMuted}
        controls={false}
        style={{ opacity: "75%" }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md mt-10">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl sm:text-5xl font-black">{topMovies.title}</h1>
          <p className="hidden lg:block">{topMovies.overview}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              navigate("/watch/" + videoUrl);
              setIsMuted(true);
            }}
            className="flex items-center gap-2 bg-gray-200 py-2 px-8 rounded-md text-xl font-bold"
          >
            <GoPlay />
            Play
          </button>
          <button
            onClick={() => {
              setIsOpenModal(true);
              setIdMovieAtom(idMovie);
            }}
            className="bg-black opacity-80 py-2 px-8 rounded-md text-white"
          >
            More Detail
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-1/2 -translate-x-1/2 text-white">
        <div
          className="border rounded-full p-2 cursor-pointer"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <GoMute size={24} /> : <GoUnmute size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

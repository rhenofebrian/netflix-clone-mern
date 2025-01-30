import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { GoMute, GoPlay, GoUnmute } from "react-icons/go";
import { getMoviesByType } from "../../utils/getMoviesByType";
import { useAtom } from "jotai";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import { getVideoURL } from "../../utils/getVideoURL";
import { useNavigate } from "react-router-dom";

const Jumbotron = () => {
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isMuted, setIsMuted] = useState(true);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieType = async () => {
      try {
        const res = await getMoviesByType({ moviesType: "top_rated" });
        setTopMovies(res[0]);
        setIdMovie(res[0].id);
        const url = await getVideoURL({ movie_id: res[0].id });
        setVideoUrl(url);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieType();
  }, [setIdMovie]);

  return (
    <div className="relative h-[60vw] w-full">
      <ReactPlayer
        url={"https://youtube.com/watch?v=" + videoUrl}
        width={"100%"}
        height={"100%"}
        playing={true}
        muted={isMuted}
        controls={false}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-5xl font-black">{topMovies.title}</h1>
          <p>{topMovies.overview}</p>
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
            onClick={() => setIsOpenModal(true)}
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

import { useAtom } from "jotai";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import { MdClose } from "react-icons/md";
import { GoPlay, GoPlusCircle } from "react-icons/go";
import { Recommendation } from "./Recommendation";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../utils/getMovieDetail";
import ReactPlayer from "react-player";
import { getVideoURL } from "../../utils/getVideoURL";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);

  const [movieDetail, setMovieDetail] = useState([]);
  const [movieUrl, setMovieUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (idMovie) {
      const fetchMovieDetail = async () => {
        try {
          const res = await getMovieDetail({ movie_id: idMovie });
          setMovieDetail(res);
        } catch (err) {
          console.log(err);
        }
      };
      const fetchVideoUrl = async () => {
        try {
          const resUrl = await getVideoURL({ movie_id: idMovie });
          setMovieUrl(resUrl);
        } catch (err) {
          console.log(err);
        }
      };
      fetchMovieDetail();
      fetchVideoUrl();
    }
  }, [idMovie]);

  const genreMapping = (genres) => {
    if (genres) {
      let res = "";
      genres.map((genre, index) => {
        if (index === genres.length - 1) {
          res += genre.name;
        } else {
          res += genre.name + ", ";
        }
      });
      return res;
    }
  };

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-screen-md p-0 bg-[#141414]">
        <div className="relative">
          <div className="h-[450px] w-full">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              playing={true}
              loop={true}
              muted={true}
              url={`https://youtube.com/watch?v=${movieUrl}`}
            />
          </div>
          <button
            onClick={() => setIsOpenModal(false)}
            className="absolute top-2 right-2 rounded-full border p-1 text-white"
          >
            <MdClose size={20} />
          </button>
          <div className="absolute bottom-1/2 left-10 mb-2">
            <h2 className="text-4xl font-black text-white">
              {movieDetail?.title}
            </h2>
          </div>
          <div className="absolute bottom-1/2 translate-y-12 left-10 ">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigate("/watch/" + movieUrl);
                  setIsOpenModal(false);
                  setMovieUrl(null);
                  setMovieDetail([]);
                  setIdMovie(null);
                }}
                className="hover: bg-slate-50 w-32 text-black flex items-center justify-center gap-2 p-1 rounded-md font-bold text-xl"
              >
                <GoPlay size={32} /> Play
              </button>
              <button className="text-slate-200 hover:text-white">
                <GoPlusCircle size={44} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 py-2 items-center text-white">
          <div>
            <div className="flex gap-2">
              <p>{movieDetail?.release_date}</p>
              <p className="text-green-400/90">
                {movieDetail?.runtime} Minutes
              </p>
            </div>
            <p className="mt-4">{movieDetail?.overview}</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <p>Genre: {genreMapping(movieDetail?.genres)}</p>
            <p>Popularity: {movieDetail?.popularity}</p>
          </div>
        </div>

        <Recommendation />
      </div>
    </dialog>
  );
};

export default Modal;

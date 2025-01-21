import { useAtom } from "jotai";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import { DETAIL_VIDEO } from "../../constants/dummyVideo";
import { MdClose } from "react-icons/md";
import { GoPlay, GoPlusCircle } from "react-icons/go";
import { Recommendation } from "./Recommendation";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../utils/getMovieDetail";

const Modal = () => {
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [idMovie] = useAtom(idMovieAtom);
  const [movieDetail, setMovieDetail] = useState([]);

  const fetchMovieDetail = async () => {
    try {
      const res = await getMovieDetail({ movie_id: idMovie });
      setMovieDetail(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (idMovie) {
      fetchMovieDetail();
    }
  }, [idMovie]);

  console.log(movieDetail);

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-screen-md p-0 bg-[#141414]">
        <div className="relative">
          <img src={DETAIL_VIDEO.image} className="w-full cursor-pointer" />
          <button
            onClick={() => setIsOpenModal(false)}
            className="absolute top-2 right-2 rounded-full border p-1 text-white"
          >
            <MdClose size={20} />
          </button>
          <div className="absolute bottom-20 left-10">
            <h2 className="text-2xl font-bold text-white">
              {DETAIL_VIDEO.title}
            </h2>
          </div>
          <div className="absolute bottom-8 left-10">
            <div className="flex gap-2">
              <button className="hover: text-slate-50">
                <GoPlay size={32} />
              </button>
              <button className="hover: text-slate-50">
                <GoPlusCircle size={32} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 py-2 items-center text-white">
          <div>
            <div className="flex gap-2">
              <p>{DETAIL_VIDEO.release_date}</p>
              <p>{DETAIL_VIDEO.runtime}</p>
            </div>
            <p>{DETAIL_VIDEO.overview}</p>
          </div>
          <div>
            <p>Genre: {DETAIL_VIDEO.genre}</p>
            <p>Popularity: {DETAIL_VIDEO.popularity}</p>
          </div>
        </div>

        <Recommendation />
      </div>
    </dialog>
  );
};

export default Modal;

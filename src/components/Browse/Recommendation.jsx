import { GoPlay } from "react-icons/go";
import { EachUtils } from "../../utils/EachUtils";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { idMovieAtom, isOpenModalAtom } from "../../jotai/atoms";
import getMovieRecommendation from "../../utils/getMovieRecommendation";
import { getVideoURL } from "../../utils/getVideoURL";
import { useNavigate } from "react-router-dom";

export const Recommendation = () => {
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [recommendationMovies, setRecommendationMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  useEffect(() => {
    if (idMovie) {
      const fetchMovieRecommendation = async () => {
        try {
          const resRecom = await getMovieRecommendation({ movie_id: idMovie });
          setRecommendationMovies(resRecom);
        } catch (err) {
          console.log(err);
        }
      };
      fetchMovieRecommendation();
    }
  }, [idMovie]);

  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl font-bold text-white">Movies Recommendation</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <EachUtils
          of={recommendationMovies}
          render={(item, index) => (
            <div
              key={index}
              className="w-full h-auto cursor-pointer rounded-md bg-[#141414]"
              onMouseEnter={() => {
                getVideoURL({ movie_id: item.id }).then((result) =>
                  setVideoUrl(result)
                );
              }}
            >
              <div className="relative">
                <img
                  src={
                    import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path
                  }
                  className="w-full h-48 rounded-t-md"
                />
                <button
                  onClick={() => {
                    {
                      navigate("/watch/" + videoUrl);
                      setIsOpenModal(false);
                      setIdMovie(null);
                    }
                  }}
                  className="absolute top-10 left-1/2 -translate-x-1/2"
                >
                  <GoPlay size={44} />
                </button>
              </div>
              <div className="p-2 text-white">
                <div className="flex gap-2">
                  <p>{item.release_date}</p>
                  <p className="text-green-400/90">{item.vote_average}</p>
                </div>
                <p className="text-wrap pt-2 max-h-32 overflow-y-scroll">
                  {item.overview}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

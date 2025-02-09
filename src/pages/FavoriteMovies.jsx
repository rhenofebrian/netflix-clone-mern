import { useEffect, useState } from "react";
import { EachUtils } from "../utils/EachUtils";
import { useAtom } from "jotai";
import MovieCard from "../components/Browse/MovieCard";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  tokenAtom,
} from "../jotai/atoms";
import BrowseLayout from "../components/Browse/BrowseLayout";
import { axiosInstanceExpress } from "../utils/axiosInstace";
import Modal from "../components/Browse/Modal";

const FavoriteMovies = () => {
  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const [isFavorited] = useAtom(isFavoritedAtom);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  const getFavoriteMovies = async () => {
    try {
      const url = `my-movies/${emailStorage}/${tokenStorage}`;
      const movies = await axiosInstanceExpress.get(url);
      if (movies.status === 200) return movies.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (emailStorage && tokenStorage) {
      getFavoriteMovies().then((result) => setMovieList(result.favoriteMovies));
    }
  }, [emailStorage, tokenStorage, isFavorited]);

  return (
    <BrowseLayout>
      <h3 className="text-white font-bold text-2xl pt-10 mt-10 px-8">
        My Favorite Movies
        {movieList.length === 0 && (
          <p className="mt-2 italic font-normal text-xl">
            No Favorite Movies..
          </p>
        )}
      </h3>
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 grid-cols-2 px-8 py-8 gap-4">
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div key={index}>
              <div
                className="h-72"
                key={index}
                onMouseLeave={() => {
                  setIsHover(false);
                  setIdMovie(null);
                }}
              >
                <MovieCard
                  data={item}
                  isHover={isHover}
                  setIsHover={setIsHover}
                />
              </div>
            </div>
          )}
        />
      </div>
      <Modal />
    </BrowseLayout>
  );
};

export default FavoriteMovies;

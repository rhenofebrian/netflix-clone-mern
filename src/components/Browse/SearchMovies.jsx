import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { EachUtils } from "../../utils/EachUtils";
import { searchMovies } from "../../utils/searchMovies";
import MovieCard from "./MovieCard";
import {
  idMovieAtom,
  isFetchingAtom,
  searchMoviesAtom,
} from "../../jotai/atoms";

const SearchMovies = () => {
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [inputMovies] = useAtom(searchMoviesAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (inputMovies) {
      const fetchSearchMovies = async () => {
        try {
          setIsFetching(true);
          const res = await searchMovies({ query: inputMovies });
          setMovieList(res);
        } catch (err) {
          console.log(err);
        } finally {
          setTimeout(() => {
            setIsFetching(false);
          }, [1000]);
        }
      };
      fetchSearchMovies();
    }
  }, [inputMovies, setIsFetching]);

  return (
    <div className="grid grid-cols-4 p-8 mt-10">
      <EachUtils
        of={movieList}
        render={(item, index) => (
          <div
            className="h-72 mt-4"
            key={index}
            onMouseLeave={() => {
              setIsHover(false);
              setIdMovie(null);
            }}
          >
            <MovieCard data={item} isHover={isHover} setIsHover={setIsHover} />
          </div>
        )}
      />
    </div>
  );
};

export default SearchMovies;

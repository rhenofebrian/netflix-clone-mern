import { useEffect, useState } from "react";
import { EachUtils } from "../../utils/EachUtils";
import MovieCard from "./MovieCard";
import CarouselLayout from "../CarouselLayout";
import { useAtom } from "jotai";
import { idMovieAtom, isFetchingAtom } from "../../jotai/atoms";
import { getMoviesByType } from "../../utils/getMoviesByType";

const MovieList = ({ title, moviesType }) => {
  const [isHover, setIsHover] = useState(false);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [movieList, setMovieList] = useState([]);

  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (moviesType) {
      const fetchMovies = async () => {
        try {
          setIsFetching(true);
          const results = await getMoviesByType({ moviesType });
          setMovieList(results);
        } catch (err) {
          console.log(err);
        } finally {
          setTimeout(() => {
            setIsFetching(false);
          }, 1000);
        }
      };
      fetchMovies();
    }
  }, [moviesType, setIsFetching]);

  return (
    <section className="px-8 py-4 relative">
      <h3 className="text-3xl font-semibold text-white mb-2">{title}</h3>
      <CarouselLayout>
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="w-1/2 md:w-1/4 xl:w-1/6 carousel-item px-2"
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
                moviesType={moviesType}
              />
            </div>
          )}
        />
      </CarouselLayout>
    </section>
  );
};

export default MovieList;

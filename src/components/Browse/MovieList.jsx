import { useEffect, useState } from "react";
import { EachUtils } from "../../utils/EachUtils";
import MovieCard from "./MovieCard";
import CarouselLayout from "../CarouselLayout";
import { useAtom } from "jotai";
import { idMovieAtom } from "../../jotai/atoms";
import { getMoviesByType } from "../../utils/getMoviesByType";

const MovieList = ({ title, moviesType }) => {
  const [isHover, setIsHover] = useState(false);
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const results = await getMoviesByType({ moviesType });
      setMovieList(results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <section className="px-8 py-4">
      <h3 className="text-3xl font-semibold text-white mb-2">{title}</h3>
      <CarouselLayout>
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="h-72 w-1/4  carousel-item mt-4"
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
          )}
        />
      </CarouselLayout>
    </section>
  );
};

export default MovieList;

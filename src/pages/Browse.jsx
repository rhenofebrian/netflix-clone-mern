import BrowseLayout from "../components/Browse/BrowseLayout";
import Jumbotron from "../components/Browse/Jumbotron";
import MovieList from "../components/Browse/MovieList";
import Modal from "../components/Browse/Modal";
import { useAtom } from "jotai";
import { searchMoviesAtom } from "../jotai/atoms";
import SearchMovies from "../components/Browse/SearchMovies";

function Browse() {
  const [searchQuery] = useAtom(searchMoviesAtom);
  return (
    <BrowseLayout>
      {searchQuery ? (
        <SearchMovies />
      ) : (
        <>
          <Jumbotron />
          <MovieList title={"Now Playing"} moviesType={"now_playing"} />
          <MovieList title={"Popular Movies"} moviesType={"popular"} />
          <MovieList title={"Top Rated Movies"} moviesType={"top_rated"} />
        </>
      )}
      <Modal />
    </BrowseLayout>
  );
}
export default Browse;

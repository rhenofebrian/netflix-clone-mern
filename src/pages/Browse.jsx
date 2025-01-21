import BrowseLayout from "../components/Browse/BrowseLayout";
import Jumbotron from "../components/Browse/Jumbotron";
import MovieList from "../components/Browse/MovieList";
import Modal from "../components/Browse/Modal";

function Browse() {
  return (
    <BrowseLayout>
      <Jumbotron />
      <MovieList title={"Now Playing"} moviesType={"now_playing"} />
      <MovieList title={"Popular Movies"} moviesType={"popular"} />
      <MovieList title={"Top Rated Movies"} moviesType={"top_rated"} />
      <MovieList title={"Upcoming Movies"} moviesType={"upcoming"} />
      <Modal />
    </BrowseLayout>
  );
}
export default Browse;

import React from "react";
import "./MoviesApp.css";
import Movie from "./Movie";
import util from "./util/util";

export default class MovieList extends React.Component {
  handleEmptyPage(movies) {
    const { handlePageChange: handler } = this.props;
    console.log(movies);
    if (movies.length <= 1) {
      handler(-1);
    }
  }

  render() {
    const {
      removeMovie,
      filteredMovies,
      currentPage,
      elementsPerPage
    } = this.props;

    const movies = filteredMovies
      .map(movie => (
        <Movie key={movie.id} movie={movie} removeMovie={removeMovie} />
      ))
      .filter((_, idx) =>
        util.checkShouldShowMovie(idx, currentPage, elementsPerPage)
      );
    return (
      <div onClick={() => this.handleEmptyPage(movies)} className="Movies">
        {movies}
      </div>
    );
  }
}

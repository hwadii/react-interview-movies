import React from "react";
import "./MoviesApp.css";
import Movie from "./Movie";

export default class MovieList extends React.Component {
  render() {
    const { removeMovie, filteredMovies } = this.props;
    const result = filteredMovies.map(movie => (
      <Movie key={movie.id} movie={movie} removeMovie={removeMovie} />
    ));
    return <div className="Movies">{result}</div>;
  }
}

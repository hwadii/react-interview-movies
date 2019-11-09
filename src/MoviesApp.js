import React from "react";
import MovieList from "./MovieList";
import "./MoviesApp.css";
import { movies$ } from "./movies";

class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isLoading: true
    };
  }

  componentDidMount() {
    movies$.then(movies => {
      this.setState({
        movies,
        isLoading: false
      });
    });
  }

  render() {
    return this.state.isLoading ? (
      <div className="Movies">Movies are loading...</div>
    ) : (
      <MovieList {...this.state} />
    );
  }
}

export default MoviesApp;

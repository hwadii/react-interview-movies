import React from "react";
import MovieList from "./MovieList";
import Multiselect from "./Multiselect";
import "./MoviesApp.css";
import { movies$ } from "./movies";

class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      filteredMovies: [],
      isLoading: true,
      categories: [],
      filteredCategories: []
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  removeMovie(id) {
    this.setState(state => ({
      filteredMovies: state.filteredMovies.filter(movie => movie.id !== id)
    }));
    this.setState(state => ({
      categories: state.filteredMovies
        .map(movie => movie.category)
        .reduce(
          (acc, category) =>
            acc.includes(category) ? acc : [...acc, category],
          []
        )
    }));
  }

  handleFilterChange(filter) {
    this.setState(state => {
      const { filteredCategories } = state;
      if (filteredCategories.includes(filter)) {
        return {
          filteredCategories: filteredCategories.filter(f => f !== filter)
        };
      } else {
        return {
          filteredCategories: [...filteredCategories, filter]
        };
      }
    });

    this.setState(state => {
      const { filteredCategories } = state;
      let { filteredMovies } = state;
      filteredCategories.forEach(category => {
        filteredMovies = state.movies
          .filter(movie => movie.category === category)
          .concat(filteredMovies);
      });
      return {
        filteredMovies
      };
    });
  }

  componentDidMount() {
    movies$.then(movies => {
      this.setState({
        movies,
        filteredMovies: [...movies],
        isLoading: false,
        categories: movies
          .map(movie => movie.category)
          .reduce(
            (acc, category) =>
              acc.includes(category) ? acc : [...acc, category],
            []
          )
      });
    });
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <div className="Movies">Movies are loading...</div>
    ) : (
      <div className="MoviesApp">
        <Multiselect
          {...this.state}
          handleFilterChange={this.handleFilterChange}
        />
        <MovieList {...this.state} removeMovie={this.removeMovie} />
      </div>
    );
  }
}

export default MoviesApp;

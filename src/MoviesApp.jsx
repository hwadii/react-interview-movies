import React from "react";
import MovieList from "./MovieList";
import Multiselect from "./Multiselect";
import "./MoviesApp.css";
import { movies$ } from "./movies";
import { map, uniqBy } from "lodash";

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

  componentDidMount() {
    movies$.then(movies => {
      this.setState({
        movies,
        filteredMovies: [...movies],
        isLoading: false,
        categories: map(uniqBy(movies, "category"), "category")
      });
    });
  }

  removeMovie(id) {
    this.setState(state => {
      const newMovies = state.movies.filter(movie => movie.id !== id);
      return {
        movies: newMovies,
        filteredMovies: [...newMovies],
        categories: map(uniqBy(newMovies, "category"), "category")
      };
    });
  }

  handleFilterChange(filter) {
    this.updateFilters(filter);
    this.updateMovieList();
  }

  updateFilters(filter) {
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
  }

  updateMovieList() {
    this.setState(state => {
      const { filteredCategories } = state;
      let filteredMovies = [];
      if (filteredCategories.length) {
        filteredCategories.forEach(category => {
          filteredMovies = state.movies
            .filter(movie => movie.category === category)
            .concat(filteredMovies);
        });
        return {
          filteredMovies
        };
      }
      return {
        filteredMovies: state.movies
      };
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      !isLoading && (
        <div className="MoviesApp">
          <Multiselect
            {...this.state}
            handleFilterChange={this.handleFilterChange}
          />
          <MovieList {...this.state} removeMovie={this.removeMovie} />
        </div>
      )
    );
  }
}

export default MoviesApp;

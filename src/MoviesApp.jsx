import React from "react";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import Multiselect from "./Multiselect";
import "./MoviesApp.css";
import { movies$ } from "./movies";
import { map, uniqBy } from "lodash";
import util from "./util/util";

class MoviesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      categories: [],
      filteredMovies: [],
      filteredCategories: [],
      pages: 0,
      elementsPerPage: 4,
      currentPage: 1,
      isLoading: true
    };
    this.removeMovie = this.removeMovie.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changeElementsPerPage = this.changeElementsPerPage.bind(this);
  }

  componentDidMount() {
    movies$.then(movies => {
      this.setState(state => {
        // const moviesWithRating = movies.map(movie => (movie["rating"] = ""));
        return {
          movies,
          pages: util.computePages(movies.length, state.elementsPerPage),
          filteredMovies: [...movies],
          isLoading: false,
          categories: map(uniqBy(movies, "category"), "category")
        };
      });
    });
  }

  removeMovie(id) {
    this.setState(state => {
      const movies = state.movies.filter(movie => movie.id !== id);
      return {
        movies,
        filteredMovies: [...movies],
        categories: map(uniqBy(movies, "category"), "category"),
        pages: util.computePages(movies.length, state.elementsPerPage)
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
      if (filteredCategories.includes(filter))
        return {
          filteredCategories: filteredCategories.filter(f => f !== filter)
        };
      return {
        filteredCategories: [...filteredCategories, filter]
      };
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
          filteredMovies,
          pages: util.computePages(filteredMovies.length, state.elementsPerPage)
        };
      }
      return {
        filteredMovies: state.movies,
        pages: util.computePages(state.movies.length, state.elementsPerPage)
      };
    });
  }

  changeElementsPerPage(event) {
    const value = event.target.value;
    console.log(value);
    this.setState(state => {
      return {
        elementsPerPage: value,
        pages: util.computePages(state.movies.length, value)
      };
    });
  }

  handlePageChange(direction) {
    this.setState(state => {
      const { currentPage, pages } = state;
      if (
        (direction === 1 && currentPage < pages) ||
        (direction === -1 && currentPage > 1)
      )
        return { currentPage: currentPage + direction };
    });
  }

  render() {
    const { isLoading, pages, currentPage, elementsPerPage } = this.state;
    return (
      !isLoading && (
        <div className="MoviesApp">
          <Multiselect
            {...this.state}
            handleFilterChange={this.handleFilterChange}
          />
          <Pagination
            currentPage={currentPage}
            pages={pages}
            elementsPerPage={elementsPerPage}
            handlePageChange={this.handlePageChange}
            handleElementsChange={this.changeElementsPerPage}
          />
          <MovieList
            {...this.state}
            removeMovie={this.removeMovie}
            handlePageChange={this.handlePageChange}
          />
        </div>
      )
    );
  }
}

export default MoviesApp;

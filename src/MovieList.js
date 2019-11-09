import React from "react";
import "./MoviesApp.css";

export default class MovieList extends React.Component {
  render() {
    const { removeMovie, filteredMovies } = this.props;
    const result = filteredMovies.map(movie => (
      <Movie key={movie.id} movie={movie} removeMovie={removeMovie} />
    ));
    return <div className="Movies">{result}</div>;
  }
}

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: ""
    };
  }

  handleRating(type) {
    const { movie } = this.props;
    const { rated } = this.state;
    if (rated) {
      if (rated === type) {
        movie[type] -= 1;
        this.setState({ rated: "" });
      } else {
        movie[type] += 1;
        movie[rated] -= 1;
        this.setState({ rated: type });
      }
    } else {
      movie[type] += 1;
      this.setState({ rated: type });
    }
  }

  render() {
    const { movie, removeMovie } = this.props;
    const { rated } = this.state;
    const ratio = (100 * movie.likes) / (movie.likes + movie.dislikes);
    return (
      <div className="Movie">
        <div onClick={() => removeMovie(movie.id)} className="Movie-delete">
          &times;
        </div>
        <div className="Movie-details">
          <h3 className="Movie-title">{movie.title}</h3>
          <h5 className="Movie-category">{movie.category}</h5>
        </div>
        <div className="Movie-rating">
          <div className="Movie-rating__likesDislikes">
            <div
              onClick={() => this.handleRating("likes")}
              className={
                rated === "likes"
                  ? "Movie-rating__thumb Movie-rating__thumbsUp"
                  : "Movie-rating__thumb"
              }
            >
              <i className="fas fa-thumbs-up"></i>
              &nbsp;{movie.likes}
            </div>
            <div
              onClick={() => this.handleRating("dislikes")}
              className={
                rated === "dislikes"
                  ? "Movie-rating__thumb Movie-rating__thumbsDown"
                  : "Movie-rating__thumb"
              }
            >
              <i className="fas fa-thumbs-down"></i>
              &nbsp;{movie.dislikes}
            </div>
          </div>
          <div className="Movie-rating__innerProgressBar">
            <div
              style={{ width: `${ratio}%` }}
              className="Movie-rating__progressBar"
            >
              {/* {ratio.toFixed(2) + "%"} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

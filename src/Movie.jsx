import React from "react";
import "./MoviesApp.css";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: ""
    };
    this.handleRating = this.handleRating.bind(this);
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
    return (
      <div className="Movie">
        <MovieAction id={movie.id} handler={removeMovie} />
        <MovieDetails title={movie.title} category={movie.category} />
        <MovieRating movie={movie} rated={rated} handler={this.handleRating} />
      </div>
    );
  }
}

function MovieAction({ id: movieId, handler }) {
  return (
    <div onClick={() => handler(movieId)} className="Movie-delete">
      &times;
    </div>
  );
}

function MovieDetails({ title, category }) {
  return (
    <div className="Movie-details">
      <h3 className="Movie-title">{title}</h3>
      <h5 className="Movie-category">{category}</h5>
    </div>
  );
}

function MovieRating({ movie, handler, rated }) {
  return (
    <div className="Movie-rating">
      <Thumbs handler={handler} movie={movie} rated={rated} />
      <Bar likes={movie.likes} dislikes={movie.dislikes} />
    </div>
  );
}

function Bar({ likes, dislikes }) {
  const ratio = (100 * likes) / (likes + dislikes);
  return (
    <div className="Movie-rating__innerProgressBar">
      <div
        style={{ width: `${ratio}%` }}
        className="Movie-rating__progressBar"
      ></div>
    </div>
  );
}

function Thumbs({ rated, movie, handler }) {
  const Thumb = ({ type }) => {
    return (
      <div
        onClick={() => handler(type)}
        className={
          rated === type
            ? "Movie-rating__thumb Movie-rating__thumbActive"
            : "Movie-rating__thumb"
        }
      >
        <ThumbIcon type={type} />
        &nbsp;{movie[type]}
      </div>
    );
  };

  return (
    <div className="Movie-rating__likesDislikes">
      <Thumb type="likes" />
      <Thumb type="dislikes" />
    </div>
  );
}

function ThumbIcon({ type }) {
  return (
    <i
      className={type === "likes" ? "fas fa-thumbs-up" : "fas fa-thumbs-down"}
    ></i>
  );
}

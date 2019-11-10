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
        <div onClick={() => removeMovie(movie.id)} className="Movie-delete">
          &times;
        </div>
        <MovieDetails title={movie.title} category={movie.category} />
        <MovieRating movie={movie} rated={rated} handler={this.handleRating} />
      </div>
    );
  }
}

function MovieDetails({ title, category }) {
  return (
    <div className="Movie-details">
      <h3 className="Movie-title">{title}</h3>
      <h5 className="Movie-category">{category}</h5>
    </div>
  );
}

function MovieRating({ movie, rated, handler }) {
  const ratio = (100 * movie.likes) / (movie.likes + movie.dislikes);
  return (
    <div className="Movie-rating">
      <div className="Movie-rating__likesDislikes">
        <Thumbs rated={rated} movie={movie} handler={handler}>
          <ThumbButton type="likes" />
          <ThumbButton type="dislikes" />
        </Thumbs>
        {/* <Thumbs rated={rated} movie={movie} type="dislikes" handler={handler} /> */}
      </div>
      <div className="Movie-rating__innerProgressBar">
        <div
          style={{ width: `${ratio}%` }}
          className="Movie-rating__progressBar"
        ></div>
      </div>
    </div>
  );
}

function Thumbs({ movie, rated, type, handler, children }, props) {
  console.log(props.children);
  return <div>{props.children}</div>;
}

function ThumbButton({ type }) {
  // <div
  //   onClick={() => handler(type)}
  //   className={
  //     rated === type
  //       ? "Movie-rating__thumb Movie-rating__thumbActive"
  //       : "Movie-rating__thumb"
  //   }
  // >
  return <ThumbIcon type={type} />;
  //   &nbsp;{movie[type]}
  // </div>;
}

function ThumbIcon({ type }) {
  return (
    <i
      className={type === "likes" ? "fas fa-thumbs-up" : "fas fa-thumbs-down"}
    ></i>
  );
}
import React from "react";
import {connect} from "react-redux";
import {formatDateForReview} from "../utils/utils.js";

const renderComment = (review) => {
  console.log(`review`, review);
  const {id, comment, user, rating, date} = review;
  return (
    <div key={id} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={formatDateForReview(date)} >{formatDateForReview(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};


const FilmInfoDescriptionReviews = ({activeFilm, reviews}) => {
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews.slice(0, 3).map((review)=> renderComment(review))}
      </div>
      <div className="movie-card__reviews-col">
        {reviews.slice(3).map((comment)=> renderComment(comment))}
      </div>
    </div>
  );
};

export {FilmInfoDescriptionReviews};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default connect(mapStateToProps, null)(FilmInfoDescriptionReviews);




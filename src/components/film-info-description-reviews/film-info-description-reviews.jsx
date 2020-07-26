import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {formatDateForReview} from "../utils/utils.js";
import {getReviews} from "../../reducer/data/selectors";

const renderComment = (review) => {
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

const FilmInfoDescriptionReviews = ({reviews}) => {
  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews.slice(0, 3).map((review)=> renderComment(review))}
      </div>
      <div className="movie-card__reviews-col">
        {reviews.slice(3).map((review)=> renderComment(review))}
      </div>
    </div>
  );
};

FilmInfoDescriptionReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export {FilmInfoDescriptionReviews};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
});

export default connect(mapStateToProps, null)(FilmInfoDescriptionReviews);

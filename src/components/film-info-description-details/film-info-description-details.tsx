import * as React from "react";
import {changeFirstLetterUppercase, formatMovieDuration} from "../utils/utils";
import {Film} from "../type";

interface Props {
  activeFilm: Film
}

const FilmInfoDescriptionDetails:React.FC<Props> = ({activeFilm}: Props) => {
  const {director, starring, runTime, genre, released} = activeFilm;
  const formattedGenre = changeFirstLetterUppercase(genre);
  const formattedRunTime = formatMovieDuration(runTime);
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.join(`                                  `)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{formattedRunTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{formattedGenre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
};


// FilmInfoDescriptionDetails.propTypes = {
//   activeFilm: PropTypes.shape({
//     starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//     director: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     runTime: PropTypes.number.isRequired,
//     released: PropTypes.number.isRequired
//   }).isRequired,
// };

export default FilmInfoDescriptionDetails;

import React from "react";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.js";
import {playerClass, playerType} from "../const/const.js";
import PropTypes from "prop-types";
import MovieVideoPlayer from "../video-player/video-player.jsx";
import history from "../../history/history.js";
import {AppRoute} from "../const/const.js";
const VideoPlayer = withVideoPlayer(MovieVideoPlayer);

const BigVideoPlayer = ({activeFilm}) => {
  if (JSON.stringify(activeFilm) === `{}`) {
    history.push(AppRoute.MAIN);
  }
  return (
    <VideoPlayer
      type={playerType.MOVIE}
      className={playerClass.PLAYER_VIDEO}
      srcVideo={activeFilm.videoLink}
      srcPoster={activeFilm.posterImage}
      id={activeFilm.id}
      isMuted
    />
  );
};

BigVideoPlayer.propTypes = {
  activeFilm: PropTypes.shape({
    videoLink: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default BigVideoPlayer;

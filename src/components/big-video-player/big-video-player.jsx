import React from "react";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import {PlayerClass, PlayerType} from "../const/const";
import PropTypes from "prop-types";
import MovieVideoPlayer from "../video-player/video-player";
import history from "../../history/history";
import {AppRoute} from "../const/const";
const VideoPlayer = withVideoPlayer(MovieVideoPlayer);

const BigVideoPlayer = ({activeFilm}) => {
  if (JSON.stringify(activeFilm) === `{}`) {
    history.push(AppRoute.MAIN);
  }
  const {videoLink, posterImage, id} = activeFilm;
  return (
    <VideoPlayer
      type={PlayerType.MOVIE}
      className={PlayerClass.PLAYER_VIDEO}
      srcVideo={videoLink}
      srcPoster={posterImage}
      id={id}
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

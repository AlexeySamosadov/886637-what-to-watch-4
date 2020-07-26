import React from "react";
import {connect} from "react-redux";
import withVideoPlayer from "../hocs/with-video-player/with-video-player.js";
import {playerClass, playerType} from "../const/const.js";
import PropTypes from "prop-types";
import MovieVideoPlayer from "../video-player/video-player.jsx";
const VideoPlayer = withVideoPlayer(MovieVideoPlayer);

const BigVideoPlayer = ({activeFilm}) => {
  return (
    <VideoPlayer
      type={playerType.MOVIE}
      className={playerClass.PLAYER_VIDEO}
      srcVideo={activeFilm.videoLink}
      srcPoster={activeFilm.posterImage}
      isMuted
    />
  );
};

BigVideoPlayer.propTypes = {
  activeFilm: PropTypes.shape({
    videoLink: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  }),
};

export {BigVideoPlayer};

const mapStateToProps = (state) => ({
  activeFilm: state.activeFilm,
});

export default connect(mapStateToProps, null)(BigVideoPlayer);

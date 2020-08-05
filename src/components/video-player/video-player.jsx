import React, {PureComponent, createRef, Fragment} from "react";
import PropTypes from "prop-types";
import {PlayerType, KeyCode, TypeEvent, ArrowTimingPercent} from "../const/const";
import "./video-player.css";
import history from "../../history/history";
import {AppRoute} from "../const/const";

const convertVideoTime = (time) => {
  let seconds;
  let minutes;
  let hours;
  let timeLeft;

  hours = Math.floor(time / 60 / 60);
  timeLeft = time - hours * 60 * 60;

  minutes = Math.floor(timeLeft / 60);
  timeLeft = timeLeft - minutes * 60;

  seconds = timeLeft;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._rootElRef = createRef();
    this._handleFullScreenChange = this._handleFullScreenChange.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _handleFullScreenChange() {
    this.props.onFullScreenButtonClick();
  }

  _renderPlayer() {
    const {children, onSetPercentFilm, onWheel, id, valueInPercent, progressInPercent, progressInSeconds, onMouseEnter, onMouseLeave, onClick,
      onPlayButtonClick, isPlaying, isIndicatorShow, onSetValue, onSoundClick, isSoundOff, isFullScreen, type} = this.props;
    switch (type) {
      case PlayerType.TRAILER:
        return <section onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} className="small-movie-card__image">
          {children}
        </section>;
      case PlayerType.MOVIE:
        return (
          <div ref={this._rootElRef} className="player">
            <span

              onWheel={(evt)=>onWheel(evt)}
              onClick={onPlayButtonClick}
              onDoubleClick={()=>{
                history.push(`${AppRoute.FILM_INFO}/${id}`);
              }}
            >
              {children}
            </span>
            <button type="button" onClick={() => {
              history.push(`${AppRoute.FILM_INFO}/${id}`);
            }} className="player__exit">Exit</button>
            {isIndicatorShow && <span className="player-value-indicator">{valueInPercent}%</span>}

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  {/* <progress className="player__progress" value={`${progressInPercent}`} max="100"/>*/}
                  <input onChange={(evt)=> onSetPercentFilm(evt)} type="range" className="player__progress" step="1" max="100"/>
                  <div className="player__toggler" style={{left: `${progressInPercent}%`}}>Toggler</div>
                </div>
                <div className="player__time-value">{progressInSeconds ? convertVideoTime(progressInSeconds) : `Время`}</div>
              </div>

              <div className="player__controls-row">
                <button onClick={onPlayButtonClick} type="button" className="player__play">
                  {isPlaying ? (
                    <Fragment>
                      <svg viewBox="0 0 14 21" width="14" height="21">
                        <use xlinkHref="#pause"/>
                      </svg>
                      <span>Pause</span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"/>
                      </svg>
                      <span>Play</span>
                    </Fragment>
                  )}
                </button>
                <div onClick={onSoundClick} className="player__controls-audio-on-off">
                  {isSoundOff ? (
                    <svg className="player__controls-audio-svg" viewBox="0 0 10 10" width="35" height="35">
                      <use xlinkHref="#speaker-off"/>
                    </svg>
                  ) : (
                    <svg className="player__controls-audio-svg player__controls-audio-svg--off" viewBox="0 0 10 10" width="35" height="35">
                      <use xlinkHref="#speaker"/>
                    </svg>
                  )}
                </div>
                <div className="player__controls-audio">
                  <input className="player__controls-audio-range" onChange={(evt)=> onSetValue(evt)} type="range" />
                  <div className="player__controls-audio-toggler" style={{left: `${valueInPercent}%`}}>Toggler</div>
                </div>


                <button onClick={() => {
                  if (isFullScreen) {
                    document.exitFullscreen();
                  } else {
                    this._rootElRef.current.requestFullscreen();
                  }
                }}
                type="button" className="player__full-screen">
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"/>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        );
      default: return <p>Something went wrong :(</p>;
    }
  }

  _onPressButton(evt) {
    if (evt.code === KeyCode.ESCAPE) {
      history.push(`${AppRoute.FILM_INFO}/${this.props.id}`);
    }
    if (evt.code === KeyCode.ARROW_RIGHT) {
      const percent = ArrowTimingPercent.TEN;
      this.onPressArrowButton(percent);
    }
    if (evt.code === KeyCode.ARROW_LEFT) {
      const percent = ArrowTimingPercent.MINUS_TEN;
      this.onPressArrowButton(percent);
    }
    if (evt.code === KeyCode.SPACE) {
      this.onPlayButtonClick(evt);
    }
  }


  componentDidMount() {
    if (this.props.type === PlayerType.MOVIE) {
      this.onPlayButtonClick = this.props.onPlayButtonClick;
      this.onPressArrowButton = this.props.onPressArrowButton;

      document.addEventListener(TypeEvent.FULL_SCREEN_CHANGE, this._handleFullScreenChange);
      document.addEventListener(TypeEvent.KEYDOWN, this._onPressButton);
    }
  }

  render() {
    return this._renderPlayer();
  }

  componentWillUnmount() {
    if (this.props.type === PlayerType.MOVIE) {
      document.removeEventListener(TypeEvent.FULL_SCREEN_CHANGE, this._handleFullScreenChange);
      document.removeEventListener(TypeEvent.KEYDOWN, this._onPressButton);
    }
  }
}

VideoPlayer.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  id: PropTypes.number,
  progressInPercent: PropTypes.number.isRequired,
  valueInPercent: PropTypes.number.isRequired,
  progressInSeconds: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPressArrowButton: PropTypes.func.isRequired,
  onSetPercentFilm: PropTypes.func.isRequired,
  onSetValue: PropTypes.func.isRequired,
  onSoundClick: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isIndicatorShow: PropTypes.bool.isRequired,
  isSoundOff: PropTypes.bool.isRequired,
  title: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([PlayerType.TRAILER, PlayerType.MOVIE]),
};

export default VideoPlayer;


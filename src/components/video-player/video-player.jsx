import React, {PureComponent, createRef, Fragment} from "react";
import PropTypes from "prop-types";
import {playerType, keyCode, typeEvent, arrowTimingPercent} from "../const/const.js";
import "./video-player.css";
import history from "../../history/history.js";
import {FilmRoute} from "../const/const";

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
    this._handlerFullScreenChange = this._handlerFullScreenChange.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _handlerFullScreenChange() {
    this.props.onFullScreenButtonClick();
  }

  _renderPlayer() {
    const {children, setPercentFilm, onWheel, valueInPercent, progressInPercent, progressInSeconds, onMouseEnter, onMouseLeave, onClick,
      onPlayButtonClick, isPlaying, isIndicatorShow, setValue, onSoundClick, isSoundOff, isFullScreen, type} = this.props;
    switch (type) {
      case playerType.TRAILER:
        return <section onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} className="small-movie-card__image">
          {children}
        </section>;
      case playerType.MOVIE:
        return (
          <div ref={this._rootElRef} className="player">
            <span

              onWheel={(evt)=>onWheel(evt)}
              onClick={onPlayButtonClick}
              onDoubleClick={()=>{
                history.push(FilmRoute.FILM_INFO);
              }}
            >
              {children}
            </span>
            <button type="button" onClick={() => {
              history.push(FilmRoute.FILM_INFO);
            }} className="player__exit">Exit</button>
            {isIndicatorShow && <span className="player-value-indicator">{valueInPercent}%</span>}

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  {/* <progress className="player__progress" value={`${progressInPercent}`} max="100"/>*/}
                  <input onChange={(evt)=> setPercentFilm(evt)} type="range" className="player__progress" step="1" max="100"/>
                  <div className="player__toggler" style={{left: `${progressInPercent}%`}}>Toggler</div>
                </div>
                <div className="player__time-value">{convertVideoTime(progressInSeconds)}</div>
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
                  <input className="player__controls-audio-range" onChange={(evt)=> setValue(evt)} type="range" />
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
    if (evt.code === keyCode.ESCAPE) {
      history.push(FilmRoute.FILM_INFO);
    }
    if (evt.code === keyCode.ARROW_RIGHT) {
      const percent = arrowTimingPercent.TEN;
      this.handlerButtonArrow(percent);
    }
    if (evt.code === keyCode.ARROW_LEFT) {
      const percent = arrowTimingPercent.MINUS_TEN;
      this.handlerButtonArrow(percent);
    }
    if (evt.code === keyCode.SPACE) {
      this.onPlayButtonClick(evt);
    }
  }


  componentDidMount() {
    this.onPlayButtonClick = this.props.onPlayButtonClick;
    this.handlerButtonArrow = this.props.handlerButtonArrow;

    // const indicator = document.querySelector(`.player-value-indicator`);
    // const removeIndicator = () => {
    //   indicator.remove();
    // };
    // setTimeout(removeIndicator, 5000);

    document.addEventListener(typeEvent.FULL_SCREEN_CHANGE, this._handlerFullScreenChange);
    document.addEventListener(typeEvent.KEYDOWN, this._onPressButton);
  }

  componentWillUnmount() {
    document.removeEventListener(typeEvent.FULL_SCREEN_CHANGE, this._handlerFullScreenChange);
    document.removeEventListener(typeEvent.KEYDOWN, this._onPressButton);
  }

  render() {
    return this._renderPlayer();
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
  progressInPercent: PropTypes.number.isRequired,
  progressInSeconds: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  handlerButtonArrow: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  title: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([playerType.TRAILER, playerType.MOVIE]),
};

export default VideoPlayer;


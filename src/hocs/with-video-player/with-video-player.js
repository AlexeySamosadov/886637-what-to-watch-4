import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {PlayerType} from "../../components/const/const";

const roundVolume = (value) => {
  const result = parseFloat(value.toFixed(2));
  if (result >= 1) {
    return 1;
  }
  if (result <= 0) {
    return 0;
  }
  return result;
};

const withVideoPlayer = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);
      this._timer = null;
      this.videoRef = createRef();
      this.state = {
        isPlaying: false,
        isFullScreen: false,
        progressInPercent: 0,
        progressInSeconds: 0,
        isSoundOff: false,
        value: 1,
        valueInPercent: 100,
        isIndicatorShow: true,
      };
      this.isPlaying = false;

      this._interval = null;

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
      this._handleMouseEnter = this._handleMouseEnter.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
      this._handleMouseClick = this._handleMouseClick.bind(this);
      this._handleOnOffSound = this._handleOnOffSound.bind(this);
      this._handleValueSet = this._handleValueSet.bind(this);
      this._setPercentFilm = this._setPercentFilm.bind(this);
      this._handleWheel = this._handleWheel.bind(this);
      this._handleButtonArrow = this._handleButtonArrow.bind(this);
    }

    _handlePlayButtonClick() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }

    _handleFullScreenButtonClick() {
      this.setState((prevState) => ({
        isFullScreen: !prevState.isFullScreen,
      }));
    }

    _handleMouseEnter() {
      this._timer = setTimeout(()=>{
        this.setState({
          isPlaying: true,
        });
      }, 1000);
    }

    _handleOnOffSound() {
      this.setState((prevState) => ({
        isSoundOff: !prevState.isSoundOff,
      }));
    }

    _handleValueSet(evt) {
      const value = evt.target.value / 100;
      this.setState(() => ({
        value,
        isIndicatorShow: true,
      }));
    }

    _setPercentFilm(evt) {
      const value = evt.target.value * 1;
      this.setState({
        progressInPercent: value,
      });
      const video = this.videoRef.current;
      video.currentTime = Math.round(video.duration * (value / 100));
    }

    _handleButtonArrow(percent) {
      this.setState((prevState) => {
        const correctPercent = () => {
          let result = prevState.progressInPercent + percent;
          if (result <= 0) {
            result = 0;
          }
          if (result >= 100) {
            result = 100;
          }
          return result;
        };
        return {
          progressInPercent: correctPercent(percent),
        };
      });

      const video = this.videoRef.current;
      video.currentTime = Math.round(video.duration * (this.state.progressInPercent / 100));
    }

    _handleMouseLeave() {
      clearTimeout(this._timer);
      this.setState({
        isPlaying: false,
      });
    }

    _handleMouseClick() {
      clearTimeout(this._timer);
    }

    _handleWheel(evt) {
      const diff = evt.deltaY / 530 * -1;
      this.setState((prevState) => ({
        value: roundVolume(prevState.value + diff),
        isIndicatorShow: true,
      }));
    }

    componentDidMount() {
      const {srcVideo, isMuted = false, type} = this.props;
      const video = this.videoRef.current;
      video.src = srcVideo;
      video.muted = isMuted;
      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      if (type === PlayerType.MOVIE) {
        video.onpause = () => {
          this.setState({
            isPlaying: false
          });
        };
      }
      video.ontimeupdate = () => this.setState({
        progressInSeconds: Math.floor(video.duration - video.currentTime),
        progressInPercent: video.duration ? Math.round(video.currentTime / video.duration * 100) : 0,
      });

      const hideIndicator = () => this.setState({
        isIndicatorShow: false,
      });
      this._interval = setInterval(hideIndicator, 5000);

      if (this.state.isPlaying) {
        video.play();
      }
    }

    componentDidUpdate() {

      const video = this.videoRef.current;

      video.muted = this.state.isSoundOff;
      video.volume = this.state.value;
      const valueInPercent = this.state.value * 100;
      this.setState({
        valueInPercent,
      });

      const {type} = this.props;
      if (type === PlayerType.MOVIE) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }

      if (type === PlayerType.TRAILER) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.load();
        }
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.onplay = null;
      video.src = ``;
      video.muted = false;
      video.onpause = null;
      video.ontimeupdate = null;
      clearInterval(this._interval);
    }

    render() {
      const {srcPoster, srcVideo, id, widthAtr = null, heightAtr = null, className = ``} = this.props;
      const {isPlaying, isFullScreen, progressInSeconds, progressInPercent, valueInPercent, isSoundOff, isIndicatorShow} = this.state;
      return <Component
        {...this.props}
        id={id}
        onFullScreenButtonClick={this._handleFullScreenButtonClick}
        onPlayButtonClick={this._handlePlayButtonClick}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onClick={this._handleMouseClick}
        onSoundClick={this._handleOnOffSound}
        onSetValue={this._handleValueSet}
        onSetPercentFilm={this._setPercentFilm}
        onWheel={this._handleWheel}
        onPressArrowButton={this._handleButtonArrow }
        isSoundOff={isSoundOff}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        progressInSeconds={progressInSeconds}
        progressInPercent={progressInPercent}
        valueInPercent={valueInPercent}
        isIndicatorShow={isIndicatorShow}
      >
        <video src={srcVideo} className={className} ref={this.videoRef} poster={srcPoster} alt="" width={widthAtr} height={heightAtr}/>
      </Component>;
    }
  }

  WithVideo.propTypes = {
    srcVideo: PropTypes.string.isRequired,
    srcPoster: PropTypes.string.isRequired,
    id: PropTypes.number,
    isMuted: PropTypes.bool,
    heightAtr: PropTypes.number,
    widthAtr: PropTypes.number,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
  };
  return WithVideo;
};

export default withVideoPlayer;


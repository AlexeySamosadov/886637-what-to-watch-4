import React from "react";
import Main from "../main/main.jsx";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import history from "../../history/history.js";
import FilmInfo from "../film-info/film-info.jsx";
import {FilmRoute} from "../const/const.js";
import MovieVideoPlayer from "../video-player/video-player.jsx";
import withVideoPlayer from "../hocs/with-video-player/with-video-player.js";
import {playerClass, playerType} from "../const/const";
import {connect} from "react-redux";

const VideoPlayer = withVideoPlayer(MovieVideoPlayer);


// eslint-disable-next-line react/prop-types
const App = ({activeFilm}) => {
  console.log(`activeFilm`, activeFilm);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={FilmRoute.MAIN}
          render={()=><Main/>}
        />
        <Route exact path={FilmRoute.PLAYER}
          render={()=>
            <VideoPlayer
              type={playerType.MOVIE}
              className={playerClass.PLAYER_VIDEO}
              srcVideo={activeFilm.videoLink}
              srcPoster={activeFilm.posterImage}
              isMuted
            />
          }
        />
        <Route exact path={FilmRoute.FILM_INFO}
          render={()=><FilmInfo/>}
        />
        {/* <PrivateRoute auth={authorizationStatus} path={}*/}
        {/*              render={}*/}
        {/* />*/}
        <Redirect to={FilmRoute.MAIN}/>
      </Switch>
    </Router>
  );
};

export {App};

const mapStateToProps = (state) => ({
  activeFilm: state.activeFilm,
});

export default connect(mapStateToProps, null)(App);


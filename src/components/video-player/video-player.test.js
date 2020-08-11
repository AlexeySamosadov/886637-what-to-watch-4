import * as React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const activeFilm = {
  backgroundColor: `#977461`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Shutter_Island.jpg`,
  description: `In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.`,
  director: `Martin Scorsese`,
  genre: `Thriller`,
  id: 3,
  isFavorite: false,
  name: `Shutter Island`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Shutter_Island.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/shutter-island.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 4.1,
  released: 2010,
  runTime: 138,
  scoresCount: 1002557,
  starring: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
  videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
};


it(`Correctly render component Video Player`, () =>{
  const tree = renderer.create(
      <VideoPlayer
        onMouseEnter={()=>{}}
        onClick={()=>{}}
        onMouseLeave={()=>{}}
        onFullScreenButtonClick={()=>{}}
        progressInPercent={50}
        valueInPercent={50}
        progressInSeconds={300}
        onPlayButtonClick={()=>{}}
        onPressArrowButton={()=>{}}
        onSetPercentFilm={()=>{}}
        onSetValue={()=>{}}
        onSoundClick={()=>{}}
        onWheel={()=>{}}
        isPlaying={true}
        isIndicatorShow={true}
        isSoundOff={true}
        isFullScreen={true}>
        <video src={activeFilm.videoLink} className={`className`} poster={activeFilm.posterImage} alt="" width={500} height={300}/>
      </VideoPlayer>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

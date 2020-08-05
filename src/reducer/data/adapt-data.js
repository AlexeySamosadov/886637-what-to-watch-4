import {extend} from "../../components/utils/utils.js";

const adaptFilmData = (data) => {
  const newFilm = extend(data, {
    posterImage: data.poster_image,
    backgroundColor: data.background_color,
    previewImage: data.preview_image,
    backgroundImage: data.background_image,
    previewVideoLink: data.preview_video_link,
    runTime: data.run_time,
    isFavorite: data.is_favorite,
    videoLink: data.video_link,
    scoresCount: data.scores_count,
  });
  delete newFilm.poster_image;
  delete newFilm.background_color;
  delete newFilm.preview_image;
  delete newFilm.background_image;
  delete newFilm.preview_video_link;
  delete newFilm.run_time;
  delete newFilm.is_favorite;
  delete newFilm.video_link;
  delete newFilm.scores_count;
  return newFilm;
};
const adaptFilmsData = (data) => data.map((film)=> adaptFilmData(film));

export {adaptFilmData, adaptFilmsData};


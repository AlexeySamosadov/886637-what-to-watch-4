import * as React from "react";
import Footer from "../footer/footer";
import GenreList from "../genre-list/genre-list";
import FilmList from "../film-list/film-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import {connect} from "react-redux";
import {getFilmsToRender} from "../../reducer/data/selectors";
import {getShowingFilmsNumber} from "../../reducer/app-status/selectors";
import {Film} from "../type";

interface Props {
  filmsToRender: Film[],
  showingFilmsNumber: number,
}

const PageContent:React.FC<Props> = ({filmsToRender, showingFilmsNumber}: Props) => {
  let isRenderButton = true;
  if (filmsToRender.length < showingFilmsNumber) {
    isRenderButton = false;
  }

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
        <FilmList films={filmsToRender}/>
        {isRenderButton && <ShowMoreButton/>}
      </section>
      <Footer/>
    </div>
  );
};

// PageContent.propTypes = {
//   filmsToRender: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     backgroundImage: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     released: PropTypes.number.isRequired,
//     posterImage: PropTypes.string.isRequired,
//     backgroundColor: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//   })).isRequired,
//   showingFilmsNumber: PropTypes.number.isRequired,
// };

const mapStateToProps = (state) => ({
  showingFilmsNumber: getShowingFilmsNumber(state),
  filmsToRender: getFilmsToRender(state),
});

export {PageContent};
export default connect(mapStateToProps, null)(PageContent);

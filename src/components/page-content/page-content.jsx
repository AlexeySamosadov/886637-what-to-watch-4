import React from "react";
import Footer from "../footer/footer.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";


const PageContent = ({films}) => {
  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
        <div className="catalog__movies-list">
          {films.map((film, i)=>{
            return (
              <article key={i} className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src={film.previewImage}
                    alt={film.name} width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="#!">{film.name}</a>
                </h3>
              </article>
            );
          })}
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

PageContent.propTypes = {
  films: PropTypes.array.isRequired,
};

export {PageContent};

const mapStateToProps = (state) => ({
  films: state.films,
});

export default connect(mapStateToProps, null)(PageContent);

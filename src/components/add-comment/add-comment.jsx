import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import history from "../../history/history";
import {AppRoute, LENGTH} from "../const/const.js";
import {Operation} from "../../reducer/data/data.js";

class AddComment extends PureComponent {
  constructor(props) {
    super(props);

    this.ratingRef = createRef();
    this.commentRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {postReview, activeFilm} = this.props;
    const {id} = activeFilm;

    postReview(id, {
      rating: this.ratingRef.current.elements.rating.value,
      comment: this.commentRef.current.value
    });
    history.push(`${AppRoute.FILM_INFO}/${id}`);
  }

  render() {
    const {name, backgroundImage, posterImage, backgroundColor, id} = this.props.activeFilm;
    const styleCard = {
      backgroundColor,
    };
    return (
      <section className="movie-card movie-card--full" style={styleCard}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="#" onClick={(e)=>{
                e.preventDefault();
                history.push(AppRoute.MAIN);
              }} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="#" onClick={(e)=> {
                    e.preventDefault();
                    history.push(`${AppRoute.FILM_INFO}/${id}`);
                  }} className="breadcrumbs__link">{name}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <a href="#" onClick={(e)=>{
              e.preventDefault();
              history.push(`${AppRoute.FILM_INFO}/${id}`);
            }} className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </a>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImage} alt={name} width="218" height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" ref={this.ratingRef} onSubmit={(e)=> {
            e.preventDefault();
            this.handleSubmit();
          }}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" defaultValue={1}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" defaultValue={2}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" defaultValue={3} defaultChecked={true}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" defaultValue={4}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" defaultChecked={5}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea"
                ref={this.commentRef}
                name="review-text"
                id="review-text"
                minLength={LENGTH.MIN}
                maxLength={LENGTH.MAX}
                placeholder="Review text"/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

export {AddComment};

AddComment.propTypes = {
  activeFilm: PropTypes.object.isRequired,
  postReview: PropTypes.func.isRequired,
};

const mapStateToDispatch = (dispatch) => ({
  postReview: (id, review) => {
    dispatch(Operation.postReview(id, review));
  }
});

export default connect(null, mapStateToDispatch)(AddComment);

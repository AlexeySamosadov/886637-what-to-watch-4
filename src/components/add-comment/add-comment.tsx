import * as React from "react";
import {connect} from "react-redux";
import history from "../../history/history";
import {AppRoute, Length} from "../const/const";
import {Operation} from "../../reducer/data/data";
import {Film} from "../type";




interface State {
  isActiveButton:boolean
}
interface Props {
  postReview: (id:number,{rating,comment}:{rating:string,comment:string}) => void ,
  activeFilm: Film
}
class AddComment extends React.PureComponent<Props, State> {
  private ratingRef: React.RefObject<any>;
  private commentRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props) {
    super(props);

    this.ratingRef = React.createRef();
    this.commentRef = React.createRef();
    this.state = {
      isActiveButton: false,
    };

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

  _handleButtonChange(e) {
    if (e.target.value.length >= Length.MIN && e.target.value.length < Length.MAX) {
      this.setState({
        isActiveButton: true,
      });
    } else if (e.target.value.length < Length.MIN) {
      this.setState({
        isActiveButton: false,
      });
    }
  }

  render() {
    const {name, backgroundImage, posterImage, backgroundColor, id} = this.props.activeFilm;
    const isActiveButton = this.state.isActiveButton;
    const styleCard = {
      backgroundColor,
    };

    const styleButton = {
      opacity: 0.3,
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

                <input className="rating__input" id="star-5" type="radio" name="rating" defaultValue={5}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea onChange={(e) => this._handleButtonChange(e)} className="add-review__textarea"
                ref={this.commentRef}
                name="review-text"
                id="review-text"
                minLength={Length.MIN}
                maxLength={Length.MAX}
                placeholder="Review text"/>
              <div className="add-review__submit">
                {isActiveButton ?
                  <button className="add-review__btn" type="submit">Post</button>
                  :
                  <button className="add-review__btn" type="submit" style={styleButton} disabled >Post</button>
                }
              </div>
            </div>
          </form>
        </div>

      </section>
    );
  }
}
//
// AddComment.propTypes = {
//   activeFilm: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     backgroundImage: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     released: PropTypes.number.isRequired,
//     posterImage: PropTypes.string.isRequired,
//     backgroundColor: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//   }).isRequired,
//   postReview: PropTypes.func.isRequired,
// };

const mapStateToDispatch = (dispatch) => ({
  postReview: (id, review) => {
    dispatch(Operation.postReview(id, review));
  }
});

export {AddComment};
export default connect(null, mapStateToDispatch)(AddComment);

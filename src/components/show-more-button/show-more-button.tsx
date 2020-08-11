import * as React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../reducer/app-status/app-status";

interface Props {
  onShowMore: () => void,
}

const ShowMoreButton:React.FC<Props> = ({onShowMore}: Props) =>(
  <div className="catalog__more">
    <button onClick={onShowMore} className="catalog__button" type="button">Show more</button>
  </div>
);

// ShowMoreButton.propTypes = {
//   onShowMore: PropTypes.func.isRequired,
// };

const mapStateToDispatch = (dispatch) => ({
  onShowMore() {
    dispatch(ActionCreators.showMore());
  }
});

export {ShowMoreButton};
export default connect(null, mapStateToDispatch)(ShowMoreButton);



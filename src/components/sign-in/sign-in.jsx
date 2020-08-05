import React, {PureComponent, createRef} from "react";
import history from "../../history/history";
import {AppRoute, AuthorizationStatus} from "../const/const";
import {connect} from "react-redux";
import {Operation} from "../../reducer/user/user";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.loginRef = createRef();
    this.passwordRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);

    if (props.authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(AppRoute.MAIN);
    }
  }

  handleSubmit(evt) {
    const {signIn} = this.props;
    evt.preventDefault();

    signIn({
      login: this.loginRef.current.value,
      password: this.loginRef.current.value,
    });

    history.push(AppRoute.MAIN);
  }


  render() {

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              history.push(AppRoute.MAIN);
            }}
            className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form onSubmit={this.handleSubmit} action="#" className="sign-in__form">
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input ref={this.loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={this.passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="#" onClick={(e)=>{
              e.preventDefault();
              history.push(AppRoute.MAIN);
            }} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export {SignIn};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

const mapStateToDispatch = (dispatch) => ({
  signIn: (data) => {
    dispatch(Operation.login(data));
  }
});

export default connect(mapStateToProps, mapStateToDispatch)(SignIn);

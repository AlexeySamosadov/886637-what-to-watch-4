import React from "react";
import history from "../../history/history";
import {AppRoute} from "../const/const";

const Footer = () => {
  return (
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
  );
};

export default Footer;

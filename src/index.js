import React from "react";
import ReacDom from "react-dom";
import App from "./components/app/app.jsx";

const data = {
  genre: `Комедия`,
  dateOut: `2010`,
};

ReacDom.render(
    <App
      data={data}
    />,
    document.querySelector(`#root`)
);

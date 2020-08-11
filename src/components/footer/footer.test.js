import * as React from "react";
import renderer from "react-test-renderer";
import Footer from "./footer";

it(`Correctly render component Footer`, () => {
  const tree = renderer.create(
      <Footer/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

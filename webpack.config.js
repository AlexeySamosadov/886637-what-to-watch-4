const path = require(`path`);
const projectLink = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: "bundle.adapt-film-data.js",
    path: projectLink,
  },
  devServer: {
    contentBase: projectLink,
    open: true,
    inline: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        }
      }
    ]
  },
  devtool: `source-map`
};

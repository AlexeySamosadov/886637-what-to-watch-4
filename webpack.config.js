const path = require(`path`);
const projectLink = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: projectLink,
  },
  resolve: {
    extensions: [`.js`, `.jsx`, `.less`, `.css`, `.tsx`, `.ts`],
  },
  devServer: {
    contentBase: projectLink,
    open: true,
    inline: true,
    port: 1339,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        }
      },
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
    ]
  },
  devtool: `source-map`
};

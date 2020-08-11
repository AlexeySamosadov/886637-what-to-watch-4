const path = require(`path`);
const projectLink = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: projectLink,
  },
  resolve: {
    extensions: [`.js`, `.jsx`, `.less`, `.css`, `.tsx`, `.ts`, `json`],
  },
  devServer: {
    contentBase: projectLink,
    host: `0.0.0.0`,
    open: true,
    inline: true,
    port: 1338,
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
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ]
  },
  devtool: `source-map`
};

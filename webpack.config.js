const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "whatwg-fetch", "./app/entry.js"],
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  devServer:{
    contentBase: "./public",
    historyApiFallback: true,
    proxy: {
      "**": "http://localhost:9090"
    },
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  module: {
    loaders: [

      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules(?!\/webpack-dev-server)/
      },
      {
        test:/\.(s*)css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'file-loader'
      }

    ]
  }
}

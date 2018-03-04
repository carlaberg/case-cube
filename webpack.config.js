const path = require("path");


module.exports = {
  entry: "./app/entry.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  devServer:{
    contentBase: "./public",
    historyApiFallback: true,
    proxy: {
      "**": "http://localhost:9090",
    }
  },
  module: {
    loaders: [

      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.jsx?$/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=uploads/[name].[ext]&outputPath=../'
      }

    ]
  }
}

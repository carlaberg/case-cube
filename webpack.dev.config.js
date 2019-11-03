const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ["babel-polyfill", "whatwg-fetch", "./app/entry.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "assets/js/bundle.js"
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
    rules: [
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new CopyPlugin([
      { 
        from: 'app/fonts/helvetiker_regular.typeface.json', 
        to: 'assets/fonts/helvetiker_regular.typeface.json' 
      }
    ]),
    // new MiniCssExtractPlugin({
    //   filename: devMode ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css'
    // })
  ] 
}

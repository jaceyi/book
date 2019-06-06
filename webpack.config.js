const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[hash:8].css',
  disable: false,
  allChunks: true
});

module.exports = {
  entry: ['babel-polyfill', './src'],

  output: {
    path: path.resolve('', 'build'),
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: /src/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('', 'src/index.html')
    }),
    extractSass,
    new FriendlyErrorsPlugin()
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './src',
    progress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080,
    proxy: {
      "/api": {
        target: "http://api.zhuishushenqi.com/",
        pathRewrite: {
          "^/api": "/"
        },
        "changeOrigin": true
      }
    }
  }
};

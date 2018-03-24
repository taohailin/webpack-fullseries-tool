const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const MinifyPlugin = require("babel-minify-webpack-plugin");
console.log('NODE_ENV: ', process.env.NODE_ENV);
let config = {
  entry: {

  },
  output: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  resolve: {
    alias: {
      statics: path.resolve(__dirname, 'src/statics')
    },
    extensions: ['.js', '.json']
  },
  externals: [],
  stats: {
    colors: true,
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',// minifying your images
            options: {
              bypassOnDebug: true,
            },
          },
          {
            loader: 'url-loader',// return a DataURL if the file is smaller than a byte limit
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader?name=[hash].[ext]',
            options: {
              limit: 10000
            }
          },
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};
switch (process.env.NODE_ENV) {
  case 'development':
    config.entry = {
      index: [
        hotMiddlewareScript,
        './src/index'
      ]
    };
    config.output.publicPath = '/';
    config.devtool = 'cheap-eval-source-map';
    config.mode = 'development';
    config.plugins = config.plugins.concat(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());

    break;
  case 'production':
    config.entry = {
      index: [
        './src/index'
      ]
    };
    config.plugins = config.plugins.concat(new CleanWebpackPlugin(['dist']), new MinifyPlugin());
    config.mode = 'production';
    config.output = {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "",//相对于HTML页面解析的输出目录的url
    };

    config.cache = true;
    break;
  default:
    break;
}


module.exports = config;
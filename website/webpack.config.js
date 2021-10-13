/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isVueProd = process.env.VUE_BUNDLE === 'production' || isProd;
const config = {
  mode: isProd ? 'production' : 'development',
  devtool: !isProd && 'source-map',
  entry: path.resolve(__dirname, './entry.js'),
  output: {
    path: path.resolve(__dirname, '../website-dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        include: /packages/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@vue/babel-plugin-jsx']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
            }
          }
        ]
      },
      {
        test: /\.tsx$/,
        include: /packages/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@vue/babel-plugin-jsx']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: [/\.vue$/],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js'),
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './website/index.html',
      filename: './index.html'
    }),
    new ProgressBarPlugin()
  ],
  devServer: {
    static: {
      directory: __dirname,
      publicPath: '/',
    },
    devMiddleware: {
      stats: 'minimal',
    },
    client: {
      overlay: true,
    },
    hot: !isVueProd,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  }
}

const cssRule = {
  test: /\.(sass|scss)$/,
  use: [
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
      }
    }
  ]
}

config.plugins.push(
  new MiniCssExtractplugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
  }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  })
)

cssRule.use.unshift(MiniCssExtractplugin.loader);
cssRule.use.unshift('style-loader');
config.module.rules.push(cssRule);

module.exports = config;
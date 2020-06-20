//Requerimientos:
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const Assets = require('./src/js/assets');

module.exports = {
  //1)
  mode: 'development', // siempre es bueno colocar el modo para evitar errores
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/bundle.js',
  },
  //2)
  //configurando servidor (puerto)

  devServer: {
    port: 3000,
  },

  //3)
  //plugins:

  plugins: [
    //1)
    //HTML:

    new HtmlWebpackPlugins({
      title: 'nombre pagina',
      template: './src/index.hbs',
      //minificcacion:
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),

    //============================
    new CopyPlugin({
      patterns: Assets.map((asset) => {
        return {
          from: path.resolve(__dirname, `./node_modules/${asset}`),
          to: path.resolve(__dirname, 'libs'),
        };
      }),
    }),
    //============================

    //LiveReloadPlugin:
    new LiveReloadPlugin(),

    //============================
    //2)
    // CSS:

    new MiniCssExtractPlugin({
      filename: 'scss/[name]-styles.css',
      chunkFilename: '[id].css',
    }),
    //============================
  ],

  //4)
  //modulos:

  module: {
    rules: [
      //1)
      //handlebars:

      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
      },
      //=================================

      //2)
      //css:
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          //postcss y autoprefixed:
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions'],
              },
              plugins: () => {
                'autoprefixer';
              },
            },
          },
          'sass-loader',
        ],
      },
      //=================================

      //3)
      //imagenes:

      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/img/',
              useRelativePath: true,
            },
          },
          //==============================

          //4)
          //disminuir el tamano de las imagenes:

          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },

              /*
             optipng.enabled: false deshabilitará optipng
              */
              optipng: {
                enabled: true, //activar true
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },

              /*
              la opción webp habilitará WEBP
              */
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      //=================================

      // Babel:

      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      //=================================
    ],
  },
};

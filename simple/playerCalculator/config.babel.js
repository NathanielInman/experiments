import webpack       from 'webpack';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';
import BrowserSync   from 'browser-sync-webpack-plugin';
import HtmlPlugin    from 'html-webpack-plugin';
import CleanWebpack  from 'clean-webpack-plugin';
import {index}       from './index.manifest';

const env = process.env.NODE_ENV==='production'?'production':'development';

export default {
  mode: env,
  entry:{
    app: ['./src/app.js'],
    vendor: ['buefy','ion-cloud','vue','vue-router']
  },
  output:{
    path: __dirname+'/dist',
    publicPath: '/',
    sourceMapFilename: '[hash].map',
    filename:'[chunkhash].js'
  },
  devtool: 'source-map',
  plugins:[
    new CleanWebpack(['dist']),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: `"${env}"`}}),
    new webpack.LoaderOptionsPlugin({
      options: {stylus: {use: [poststylus(['autoprefixer'])]}}
    }),
    new HtmlPlugin(index),
    new BrowserSync({
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['./dist'] }
    })
  ],
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {test: /\.styl$/, use: ['style-loader','css-loader','stylus-loader']},
      {test: /\.pug/, use: 'pug-loader'},
      {test: /\.css$/, use: ['style-loader','css-loader']}
    ] //end rules
  } //end module
};

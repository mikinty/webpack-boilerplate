const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const glob = require('glob');

// webpack parts file
const parts = require('./webpack.parts');

// commonly used path variables
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

// configuration shared by production and development
const commonConfig = merge([
  {
  // Entries have to resolve to files! They rely on Node
  // convention by default so if a directory contains *index.js*,
  // it resolves to that.
    entry: {
      main: PATHS.src,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Mitophace',
      }),
    ],
  },
  parts.loadSASS(),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  // needs to run AFTER extract text plugin
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // customize host/port here if necessary
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
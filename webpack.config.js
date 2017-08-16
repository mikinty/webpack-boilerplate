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
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),  
]);

const productionConfig = merge([
  {
    entry: {
      vendor: ['react'],
    },
  },
  // for bundle splitting, automatically searches through node_modules
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
  ]),
  parts.generateSourceMaps({ type: 'source-map' }),  
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  // needs to run AFTER extract text plugin
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
  }),
  // load images
  parts.loadImages({
    options: {
      limit: 15000, // uses file-loader if over
      name: '[name].[ext]',
    },
  }),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer({
    // customize host/port here if necessary
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),  
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
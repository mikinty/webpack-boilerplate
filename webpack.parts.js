// settings for webpack dev server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

// rules for loading CSS
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              // allow for local classes instead of global
              modules: true,
              // indicates how many loaders are after css-loader
              importLoaders: 1,
            },
          },
          'sass-loader', // in case you import sass into css
        ],
      },
    ],
  },
});

// SASS is an awesome and powerful CSS preprocessor
exports.loadSASS = ({ include, exclude } = {}) => ({
  module: {
    rules: [{
      test: /\.scss$/,
      include,
      exclude,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }],
  },
});
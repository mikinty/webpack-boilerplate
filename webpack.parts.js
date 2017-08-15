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
            },
          },
        ],
      },
    ],
  },
});
var webpack = require('webpack');

module.exports = {
  entry: './scripts/script.js',
  output: {
    filename: 'dist/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
    })
  ],
}

var path = require('path');
var webpack = require('webpack');

let PATHS = {
  style: path.resolve('./src/client/styles'),
  style1: path.resolve('./node_modules/react-toolbox')
}

module.exports = {
  devtool: 'eval',
  entry: [
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/client/styles/index.scss',
    './src/client/index',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
        {
          test: /\.jsx?/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/,
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.s?css$/,
          loaders: [
            'style',
            'css?modules,localIdentName=[local]__[hash:base64:5]',
            // 'postcss',
            // 'resolve-url',
            'sass?sourceMap',
            // 'toolbox'
          ],
          // loaders: ['style', 'css', 'sass'],
          exclude: /(node_modules)\/react-toolbox/
        },
        {
          test    : /(\.scss|\.css)$/,
          include : /(node_modules)\/react-toolbox/,
          loaders : [
            require.resolve('style-loader'),
            require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            require.resolve('sass-loader') + '?sourceMap'
          ]
        },
        {test: /\.json$/, loader: 'json'},
        {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, loader: 'file?name=[name].[ext]'},
        {test: /\.eot|\.ttf|\.svg|\.woff2?/, loader: 'file?name=[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            APP_ENV: JSON.stringify('browser')
        }
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: path.resolve('./src/client/components'),
      lib: path.resolve('./src/client/lib'),
      styles: path.resolve('./src/client/styles'),
      routes: path.resolve('./src/client/routes'),
    }
  }
};

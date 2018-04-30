module.exports =
  {
    contentBase: 'ui',
    stats: {
      modules: false,
      reasons: false,
      chunks: false,
      hash: false,
      timings: false,
      version: false,
      children: false,
      assets: false,
      colors: true
    },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

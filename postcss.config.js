module.exports = ({ file, options, env}) => ({
  plugins: {
      'autoprefixer': { browsers: ['last 2 versions'] },
      'postcss-import': {},
      'colorguard': {},
      'postcss-font-magician': {}
  }
});

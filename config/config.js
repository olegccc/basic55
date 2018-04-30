module.exports = {
  port: 8080,
  rollup: {
    debug: {
      files: {
        'debug/language.js': 'language/index.ts'
      },
      format: 'iife',
      name: 'basic55'
    }
  },
  webpack: {
    debug: require('./webpack')(false)
  }
};
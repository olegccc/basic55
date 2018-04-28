module.exports = {
  exec: {
    'rollup-debug': 'rollup language/index.js --format iife --name "basic55" --file debug/language.js'
  },
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
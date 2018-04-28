const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const postcss  = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');

module.exports = function(grunt) {
  grunt.registerMultiTask('rollup', async function() {
    const config = this.data || {};
    const done = this.async();
    const files = Object.keys(config.files);
    for (const target of files) {
      console.log(`${config.files[target]} => ${target}`);
      try {
        const inputOptions = {
          input: config.files[target],
          plugins: [
            resolve(),
            rollupTypescript({
              typescript: require('typescript')
            }),
            postcss({
              plugins:[]
            })
          ]
        };
        // console.log(bundle.imports); // an array of external dependencies
        // console.log(bundle.exports); // an array of names exported by the entry point
        // console.log(bundle.modules); // an array of module objects
        const outputOptions = {
          format: config.format || 'iife',
          name: config.name,
          file: target
        };
        const bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
      } catch (error) {
        console.error(error);
      }
    }
    done();
  });
};

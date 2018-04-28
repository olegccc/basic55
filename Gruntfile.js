module.exports = function(grunt) {
  [].forEach(task => grunt.loadNpmTasks(task));
  grunt.initConfig(require('./config/config'));
  grunt.task.loadTasks('./tasks');
};

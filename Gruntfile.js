'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    'wct-test': {
      desktop: {
        options: {
          browsers: ['chrome', 'firefox', 'safari'],
          remote: false
        }
      },
      remote: {
        options: {remote: true}
      }
    }
  });

  grunt.loadNpmTasks('web-component-tester');
  grunt.registerTask('default', 'wct-test:desktop');
  grunt.registerTask('travis', 'wct-test:remote');
};

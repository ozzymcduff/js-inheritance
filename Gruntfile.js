module.exports = function (grunt) {
  // Load Grunt tasks declared in the package.json file.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // Project configuration.
  grunt.initConfig({
    /**
     * This will load in our package.json file so we can have access
     * to the project name and appVersion number.
     */
    pkg: grunt.file.readJSON('package.json'),
    /**
     * Constants for the Gruntfile so we can easily change the path for our environments.
     */
    BASE_PATH: '',
    requirejs: {
      compile: {
        options: {
          baseUrl: '<%= BASE_PATH %>' + 'test/',
          mainConfigFile: '<%= BASE_PATH %>' + 'test/setup.js',
          name: 'setup',
          out: '<%= BASE_PATH %>' + 'test/setup_out.js',
          useStrict: true,
          pragmas: {
            debugExclude: true
          },
          optimize: 'none',
          paths: {
            application: '../lib/application',
            expect: 'empty:',
            mocha: 'empty:',
            requirejs: 'empty:'
          },
          wrap: {
            startFile: 'test/wrap.start',
            endFile: 'test/wrap.end'
          }
        }
      }
    },
  });

  grunt.registerTask('default', ['requirejs']);
};
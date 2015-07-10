'use strict';
var std = '../test/standard_inheritance_spec.js',
  prot = '../test/prototype_inheritance_spec.js';

if (typeof module !== 'undefined' && module.exports) {
  var mocha = require('mocha');
  var requirejs = require('requirejs');
  requirejs.config({
    baseUrl: './lib',
    nodeRequire: require,
    shims: {
      'expect': {
        deps: ['expect.js']
      }
    }
  });
  console.log('module exports');
  requirejs(['expect', 'application', '../test/spec', std, prot], function startMocha() {
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
  });
} else {
  require.config({
    baseUrl: '../lib',
    paths: {
      'expect_js': '../node_modules/expect.js/index',
      'expect': '../test/expect'
    },
    shims: {
      'expect': {
        init: function () {
          return window.expect;
        }
      }
    }
  });
  console.log('other');

  require(['../test/spec', std, prot], function startMocha(_) {
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
  });
}
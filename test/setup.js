require.config({
  baseUrl: '../lib',
  paths: {
    'expect_js': '../node_modules/expect.js/index',
    'expect': '../test/expect',
  }
});

define(['require', 'expect', 'application',
 '../test/spec', '../test/standard_inheritance_spec.js', '../test/prototype_inheritance_spec.js'], function (require) {
  'use strict';
  mocha.checkLeaks();
  mocha.globals([]);
  mocha.run();
});
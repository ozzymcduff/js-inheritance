

if (typeof module !== 'undefined' && module.exports) {
  var mocha = require('mocha');
  var requirejs = require('requirejs');
  requirejs.config({
    baseUrl: './lib',
    nodeRequire: require,
    shims:{
      "expect":{
        deps:['expect.js']
      }
    }
  });
  requirejs(["expect", 'application', "../test/spec"], function startMocha(){
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
    console.log("Q");
  });
}else{
  require.config({
    baseUrl: '../lib',
    paths: {
      "expect_js" : "../node_modules/expect.js/index",
      "expect": "../test/expect"
    },
    shims:{
      "expect":{
        init: function(){
          console.log(1);
          return window.expect;
        }
      }  
    }
  });
  require(['../test/spec'], function startMocha(_){
    mocha.checkLeaks();
    mocha.globals([]);
    mocha.run();
  });
}

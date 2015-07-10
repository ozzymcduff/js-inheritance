if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['expect_js'],function(expectjs){
  if (expectjs){
    return expectjs;
  }
  return window.expect;
});

define(['expect_js'], function (expectjs) {
  if (expectjs) {
    return expectjs;
  }
  return window.expect;
});
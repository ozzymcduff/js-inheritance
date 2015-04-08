'use strict';
function grammarReplace(input) {
  function toUpper(str){
    return str.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  //if (typeof input != 'string') return
  //input = hookImmutable('preprocessing', input)
  return input.
    replace(/\t/g, '  ').
    replace(/\r\n|\n|\r/g, '\n').
    split('__END__')[0].
    replace(/([\w\.]+)\.(stub|destub)\((.*?)\)$/gm, '$2($1, $3)').
    replace(/describe\s+(.*?)$/gm, 'describe($1, function(){').
    replace(/shared_behaviors_for\s+(.*?)$/gm, 'shared_behaviors_for($1, function(){').
    replace(/^\s+it\s+(.*?)$/gm, ' it($1, function(){').
    replace(/^ *(before_nested|after_nested|before_each|after_each|before|after)(?= |\n|$)/gm, function(match, p1){ return toUpper(p1)+'(function(){';}).
    replace(/^\s*end(?=\s|$)/gm, '});').
    replace(/-\{/g, 'function(){').
    //replace(/(\d+)\.\.(\d+)/g, function(_, a, b){ return range(a, b) }).
    //replace(/\.should([_\.]not)?[_\.](\w+)(?: |;|$)(.*)$/gm, '.should$1_$2($3)').
    replace(/([\/\s]*)(.+?)\.(should(?:[_\.]not)?)[_\.](\w+)\((.*)\)\s*;?$/gm, '$1 expect($2).toEqual($5)').
    replace(/, \)/g, ')').
    replace(/should\.not/g, 'should_not');
}

var fs = require('fs');
fs.readFile('./spec/unit/spec.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = grammarReplace(data);

  fs.writeFile('./spec/spec_r.js', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
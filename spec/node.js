
require('./lib/jspec')
require('./unit/spec.helper')
require('../lib/application')

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()

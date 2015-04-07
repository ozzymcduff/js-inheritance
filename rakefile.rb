
task :default do
  sh "npm test" do |ok, res|
    if !ok
      raise "failed jspec!"
    end
  end
end

task :jsdoc do
  sh "java -jar ./jsdoc/jsrun.jar ./jsdoc/app/run.js -a -d=./ -t=./jsdoc/templates/jsdoc/ ./lib/" do |ok, res|
    if !ok
      raise "failed jsdoc!"
    end  
  end
end

task :default do
  sh "jspec run --rhino" do |ok, res|
    if !ok
      raise "failed jspec!"
    end
  end
end

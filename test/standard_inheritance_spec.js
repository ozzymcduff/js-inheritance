define(['expect','application'], function tests(expect, application){

  describe('standard inheritance', function(){
    var std = {};
    beforeEach(function(){
      var desc = std;
      desc.FurryAnimal = function FurryAnimal(name){
        var self = this;
        this.m_name = name;
        this.sayName = function(){return self.m_name;};
      };
      desc.Feline = function Feline(name){
        var self = this;
        desc.FurryAnimal.call(this,name);
      };
      desc.Cat = function Cat(name){
        var self = this;
        desc.Feline.apply(this,arguments);
      };
    });
    describe('rat', function(){
      beforeEach(function(){
        std.animal = new std.FurryAnimal("rat");
      });
      it("animal should say rat", function(){
        expect(std.animal.sayName()).to.equal("rat");
      });
      it("rat should have type", function(){
        expect(application.getName(std.animal)).to.equal("FurryAnimal");
      });
    });
    describe('lion', function(){
      beforeEach(function(){
        std.lion = new std.Feline("lion");
      });
      it("should say lion", function(){
        expect(std.lion.sayName()).to.equal("lion");
      });
      it("should despite redefining 'this' say lion", function(){
        expect(std.lion.sayName.call({m_name:"red"})).to.equal("lion");
      });
      it("lion should have type", function(){
        expect(application.getName(std.lion)).to.equal("Feline");
      });
    });
    describe('cat', function(){
      beforeEach(function(){
        std.cat = new std.Cat("missan");
      });
      it("should say missan", function(){
        expect(std.cat.sayName()).to.equal("missan");
      });
      it("cat should have type", function(){
        expect(application.getName(std.cat)).to.equal("Cat");
      });
    });
  });
});

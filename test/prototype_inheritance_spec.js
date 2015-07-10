define(['expect','application'], function tests(expect, application){
  describe('prototype', function(){
    var prt = {};
    describe('animal', function(){
      beforeEach(function(){
        var desc = prt;
        desc.FurryAnimal = function FurryAnimal(name){
          this.m_name = name;
        };
        desc.FurryAnimal.prototype.sayName = function(){return this.m_name;};

        desc.Feline = function Feline(name){
          var self = this;
          desc.FurryAnimal.call(this,name);
        };
        desc.Feline.prototype = Object.create(desc.FurryAnimal.prototype);
        desc.Feline.prototype.constructor = desc.Feline;
        desc.Cat = function Cat(name){
          var self = this;
          desc.Feline.apply(this,arguments);
        };
        desc.Cat.prototype = Object.create(desc.Feline.prototype);
        desc.Cat.prototype.constructor = desc.Cat;

        desc.Animal = function Animal(name){
          var self = this;
          this.m_name = name;
          this.sayName = function(){return self.m_name;};
        };
      });
      it("protect", function(){
        var desc = prt;
        var animal = application.protectThis(new desc.Animal("animal"));
        expect(animal.sayName.call({m_name:"name"})).to.equal("animal");
      });
      describe('rat', function(){
        beforeEach(function(){
          prt.animal = new prt.FurryAnimal("rat");
        });
        it("animal should say rat", function(){
          expect(prt.animal.sayName()).to.equal("rat");
        });
        it("rat should have type", function(){
          expect(application.getName(prt.animal)).to.equal("FurryAnimal");
        });
        it("rat should be instance of", function(){
          expect(prt.animal instanceof prt.FurryAnimal).to.equal(true);
        });
      });
      describe('lion', function(){
        beforeEach(function(){
          prt.lion = new prt.Feline("lion");
        });
        it("should say lion", function(){
          expect(prt.lion.sayName()).to.equal("lion");
        });
        it("should when redefining 'this' say red", function(){
          expect(prt.lion.sayName.call({m_name:"red"})).to.equal("red");
        });
        it("lion should have type", function(){
          expect(application.getName(prt.lion)).to.equal("Feline");
        });
        it("lion should be instance of", function(){
          expect(prt.lion instanceof prt.FurryAnimal).to.equal(true);
          expect(prt.lion instanceof prt.Feline).to.equal(true);
        });
      });
      describe('cat', function(){
        beforeEach(function(){
          prt.cat = new prt.Cat("missan");
        });
        it("should say missan", function(){
          expect(prt.cat.sayName()).to.equal("missan");
        });
        it("cat should have type", function(){
          expect(application.getName(prt.cat)).to.equal("Cat");
        });
      });
    });
    describe('self', function(){
      var slf = {};
      beforeEach(function(){
        var desc = slf;
        desc.SpineLess = function SpineLess(name){
          //this.m_name = name;
          this.getSelf().m_name = name;
        };
        desc.SpineLess.prototype = new (function(){
          var self = this;//Since were working in a prototype, this isnt safe.
          this.m_name = "none";
          this.sayName = function(){return self.m_name;};
          this.getSelf = function(){return self;};//The danger of prototype inheritance
        })();
        //Object.create(
      });

        /*app.protectThis*/
        describe('mollusc', function(){
          beforeEach(function(){
            slf.mollusc = new slf.SpineLess("mollusc");
            slf.annelid = new slf.SpineLess("annelid");
          });
          it("mollusc should say annelid!", function(){
            expect(slf.mollusc.sayName()).to.equal("annelid");
          });
          it("annelid should say annelid", function(){
            expect(slf.annelid.sayName()).to.equal("annelid");
          });
          it("mollusc should be able to change name of annelid", function(){
            slf.mollusc.getSelf().m_name = "mollusc";
            expect(slf.annelid.sayName()).to.equal("mollusc");
          });
        });
    });
  });


});

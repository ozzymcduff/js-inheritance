if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['expect', 'application'], function tests(expect, application) {
  describe('app', function () {
    var app = {};
    beforeEach(function () {
      var desc = app;
      desc.Animal = function () {
        this.breathes = true;
        this.walk = false;
        this.dowalk = function () {
          this.walk = true;
        };
      };
    });
    describe('Animal', function () {
      it('Animal class should exist', function () {
        expect(app.Animal).to.not.be(undefined);
      });
      it("Animal class should be constructable", function () {
        var a = new app.Animal();
        expect((a instanceof app.Animal)).to.equal(true);
      });
      it("Animal class should require new", function () {
        try {
          var a = app.Animal();
        } catch (e) {
          expect((e instanceof TypeError)).to.equal(true);
        }
      });
      it("Animal object should breath", function () {
        var a = new app.Animal();
        expect((a.breathes)).to.equal(true);
      });
      it("Animal object should be able to walk", function () {
        var a = new app.Animal();
        a.dowalk();
        expect((a.walk)).to.equal(true);
      });
      describe("feline", function () {
        beforeEach(function () {
          var desc = app;
          desc.Feline = function () {
            desc.Animal.call(this);
            this.claws = true;
            this.furry = true;
            this.says = function () {
              console.log('GRRRRR');
            };
            this.declaw = function () {
              this.claws = false;
            };
          };
        });
        it("Feline class should be constructable", function () {
          var f = new app.Feline();
          expect((f instanceof app.Feline)).to.equal(true);
        });
        it("Feline object should breath", function () {
          var f = new app.Feline();
          expect((f.breathes)).to.equal(true);
        });
        it("Feline object should have claws and be furry", function () {
          var f = new app.Feline();
          expect(f.claws).to.equal(true);
          expect(f.furry).to.equal(true);
        });
        it("Should be able to declaw a feline object", function () {
          var f = new app.Feline();
          var f2 = new app.Feline();
          f.declaw();
          expect(f.claws).to.equal(false);
          expect(f2.claws).to.equal(true);
        });
        it("Should be able to declaw a feline object despite redefining this", function () {
          var f = application.protectThis(new app.Feline());
          f.declaw.call({
            claws: true
          });
          expect((f.claws)).to.equal(false);
        });
        it("Feline object should be able to walk", function () {
          var a = new app.Feline();
          a.dowalk();
          expect(a.walk).to.equal(true);
        });
      });
    });
  });

  describe('override', function () {
    var ovr = {};
    beforeEach(function () {
      var desc = ovr;
      desc.FurryAnimal = function (name) {
        var self = this;
        this.m_name = name;
        this.sayName = function () {
          return self.m_name;
        };
        this.say = function (that) {
          return that;
        };
      };
      desc.Feline = function (name) {
        var self = this;
        desc.FurryAnimal.call(this, name);
        application.override(self, 'sayName', function () {
          return "Feline: " + this();
        });
        application.override(self, 'say', function (that) {
          return "Feline: " + this(that);
        });
      };
      desc.Cat = function (name) {
        var self = this;
        desc.Feline.apply(this, arguments);
        application.override(self, 'sayName', function () {
          return "Cat: " + this();
        });
        application.override(self, 'say', function (that) {
          return "Cat: " + this(that);
        });
      };
    });
    describe('rat', function () {
      beforeEach(function () {
        ovr.animal = new ovr.FurryAnimal("rat");
      });
      it("animal should say rat", function () {
        expect(ovr.animal.sayName()).to.equal("rat");
      });
    });
    describe('lion', function () {
      beforeEach(function () {
        ovr.lion = new ovr.Feline("lion");
      });
      it("should say lion", function () {
        expect(ovr.lion.sayName()).to.equal("Feline: lion");
        expect(ovr.lion.say('lion')).to.equal("Feline: lion");
      });
      it("should despite redefining 'this' say lion", function () {
        expect(ovr.lion.sayName.call({
          m_name: "red"
        })).to.equal("Feline: lion");
        expect(ovr.lion.say.call({
          m_name: "red"
        }, 'lion')).to.equal("Feline: lion");
      });
    });
    describe('cat', function () {
      beforeEach(function () {
        ovr.cat = new ovr.Cat("missan");
      });
      it("should say missan", function () {
        expect(ovr.cat.sayName()).to.equal("Cat: Feline: missan");
        expect(ovr.cat.say('missan')).to.equal("Cat: Feline: missan");
      });
    });
  });
});

describe 'standard inheritance'
	before_each
		var desc = this;
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
	end
	describe 'rat'
		before_each
			this.animal = new this.FurryAnimal("rat");
		end
		it "animal should say rat"
			this.animal.sayName().should.be("rat");
		end
		it "rat should have type"
			app.getName(this.animal).should.be("FurryAnimal");
		end

	end
	describe 'lion'
		before_each
			this.lion = new this.Feline("lion");
		end
		it "should say lion"
			this.lion.sayName().should.be("lion")
		end
		it "should despite redefining 'this' say lion"
			this.lion.sayName.call({m_name:"red"}).should.be("lion");
		end
		it "lion should have type"
			app.getName(this.lion).should.be("Feline");
		end
	end
	describe 'cat'
		before_each
			this.cat = new this.Cat("missan");
		end
		it "should say missan"
			this.cat.sayName().should.be("missan");
		end
		it "cat should have type"
			app.getName(this.cat).should.be("Cat");
		end

	end
end
describe 'prototype'
	describe 'animal'
		before_each
			var desc = this;
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
		end
		it "protect"
			var desc = this;
			var animal = app.protectThis(new desc.Animal("animal"));
			animal.sayName.call({m_name:"name"}).should.be("animal");
		end
		describe 'rat'
			before_each
				this.animal = new this.FurryAnimal("rat");
			end
			it "animal should say rat"
				this.animal.sayName().should.be("rat");
			end
			it "rat should have type"
				app.getName(this.animal).should.be("FurryAnimal");
			end
			it "rat be instanceof"
				(this.animal instanceof this.FurryAnimal).should.be(true);
			end
		end
		describe 'lion'
			before_each
				this.lion = new this.Feline("lion");
			end
			it "should say lion"
				this.lion.sayName().should.be("lion")
			end
			it "should when redefining 'this' say red"
				this.lion.sayName.call({m_name:"red"}).should.be("red");
			end
			it "lion should have type"
				app.getName(this.lion).should.be("Feline");
			end
			it "lion be instanceof"
				(this.lion instanceof this.FurryAnimal).should.be(true);
				(this.lion instanceof this.Feline).should.be(true);
			end
		end
		describe 'cat'
			before_each
				this.cat = new this.Cat("missan");
			end
			it "should say missan"
				this.cat.sayName().should.be("missan");
			end
			it "cat should have type"
				app.getName(this.cat).should.be("Cat");
			end

		end
	end
	describe 'self'
		before_each
			var desc = this;
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
		end
	
		/*app.protectThis*/
		describe 'mollusc'
			before_each
				this.mollusc = new this.SpineLess("mollusc");
				this.annelid = new this.SpineLess("annelid");
			end
			it "mollusc should say annelid!"
				this.mollusc.sayName().should.be("annelid");
			end
			it "annelid should say annelid"
				this.annelid.sayName().should.be("annelid");
			end
			it "mollusc should be able to change name of annelid"
				this.mollusc.getSelf().m_name = "mollusc";
				this.annelid.sayName().should.be("mollusc");
			end
		end
	end
end
/*
describe 'mootools inheritance'
	describe 'animal'
		before_each
			var desc = this;
			desc.MooAnimal = new Class({
				initialize: function(age){
					this.age = age;
					this.name = "";
				},
				getAge: function(){
					return this.age;
				},
				setName: function(name){
					this.name = name
				}
			});
		end
		it "should have age"
			var desc = this;
			print(desc.MooAnimal);
			var myAnimal = new desc.MooAnimal(22);
			myAnimal.age.should.be(22);
			myAnimal.getAge().should.be(22);
		end
		it "should be able to set name"
			var desc = this;
			print(desc.MooAnimal);
			var myAnimal = new desc.MooAnimal(22);
			myAnimal.setName("flux");
			myAnimal.name.should.be("flux");
		end
		describe 'cat'
			before_each
				var desc = this;
				desc.MooCat = new Class({
					Extends: desc.MooAnimal,
					initialize: function(name, age){
						this.parent(age); //will call initalize of Animal
						this.name = name;
					}
				});
			end
			it 'should be named micia'
				print(this.MooCat);
				var myCat = new this.MooCat('Micia', 20);
				myCat.should.not.be_undefined();
				for(x in myCat){ print (""+x);}
				myCat.name.should.be("Micia"); //Alerts 'Micia'.
				myCat.age.should.be(20); //Alerts 20.

			end
		end
	end
end*/

describe 'app'
	before_each
		var desc = this;
		desc.Animal = function(){
			this.breathes = true;
			this.walk = false;
			this.dowalk = function(){
				this.walk = true;
			};
		};
	end
	describe 'Animal'
		it 'Animal class should exist'
			this.Animal.should.not.be_undefined
		end
		it "Animal class should be constructable"
			var a = new this.Animal();
			a.should.not.be_undefined();
			(a instanceof this.Animal).should.be_true();
		end
		it "Animal class should require new"
			try {
				var a = this.Animal();
			}
			catch (e) {
				(e).should.not.be_undefined();
				(e instanceof TypeError).should.be_true();
			}
			(a).should.be_undefined();
		end
		it "Animal object should breath"
			var a = new this.Animal();
			(a.breathes).should.be_true();
		end
		it "Animal object should be able to walk"
			var a = new this.Animal();
			a.dowalk();
			(a.walk).should.be_true();
		end
		describe "feline"
			before_each
				var desc = this;
				desc.Feline = function(){
					desc.Animal.call(this);
					this.claws = true;
					this.furry = true;
					this.says = function() {
						console.log ('GRRRRR');
					};
					this.declaw = function() {
						this.claws = false;
					};
				};
			end
			it "Feline class should exist"
				(this.Feline).should.not.be_null();
			end
			it "Feline class should be constructable"
				var f = new this.Feline();
				(this.Feline).should.not.be_undefined();
				(f instanceof this.Feline).should.be_true();
			end
			it "Feline object should breath"
				var f = new this.Feline();
				(f.breathes).should.be_true();
			end
			it "Feline object should have claws and be furry"
				var f = new this.Feline();
				(f.claws).should.be_true();
				(f.furry).should.be_true();
			end
			it "Should be able to declaw a feline object"
				var f = new this.Feline();
				var f2 = new this.Feline();
				f.declaw();
				(f.claws).should.be_false();
				(f2.claws).should.be_true();
			end
			it "Should be able to declaw a feline object despite redefining this"
				var f = app.protectThis(new this.Feline());
				f.declaw.call({claws:true});
				(f.claws).should.be_false();
			end
			it "Feline object should be able to walk"
				var a = new this.Feline();
				a.dowalk();
				(a.walk).should.be_true();
			end
		end
	end
end

describe 'override'
	before_each
		var desc = this;
		desc.FurryAnimal = function (name){
			var self = this;
			this.m_name = name;
			this.sayName = function(){return self.m_name;};
			this.say = function(that){return that;};
		};
		desc.Feline = function (name){
			var self = this;
			desc.FurryAnimal.call(this,name);
			app.override(self,'sayName',function(){ return "Feline: "+this();})
			app.override(self,'say',function(that){ return "Feline: "+this(that);})
		};
		desc.Cat = function(name){
			var self = this;
			desc.Feline.apply(this,arguments);
			app.override(self,'sayName',function(){ return "Cat: "+this();})
			app.override(self,'say',function(that){ return "Cat: "+this(that);})
		};
	end
	describe 'rat'
		before_each
			this.animal = new this.FurryAnimal("rat");
		end
		it "animal should say rat"
			this.animal.sayName().should.be("rat");
		end
	end
	describe 'lion'
		before_each
			this.lion = new this.Feline("lion");
		end
		it "should say lion"
			this.lion.sayName().should.be("Feline: lion")
			this.lion.say('lion').should.be("Feline: lion")
		end
		it "should despite redefining 'this' say lion"
			this.lion.sayName.call({m_name:"red"}).should.be("Feline: lion");
			this.lion.say.call({m_name:"red"},'lion').should.be("Feline: lion");
		end
	end
	describe 'cat'
		before_each
			this.cat = new this.Cat("missan");
		end
		it "should say missan"
			this.cat.sayName().should.be("Cat: Feline: missan");
			this.cat.say('missan').should.be("Cat: Feline: missan");
		end
	end
end

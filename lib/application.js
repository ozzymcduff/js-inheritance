/** @namespace */
app = {};
/**
* Takes an iterable and transforms it into an array.
*/
app.toArray = function (iterable) {
		return Array.prototype.slice.call(iterable);
	};
/**
* Inspired by Cobra.Class.method(callable, self)
* It will wrap a function to give it a new _this_ context.
*/
app.methodize = function (/** the function to wrap inside a new function call to give it a new this context.*/ callable, /** self is the python verb for _this_ class.*/ self) {
	
	function method () {
		var args = app.toArray(arguments);
		return callable.apply(self, args);
	}
	method.callable = callable;
	return method;
};
/**
* This function takes an object and wraps each of it's functions in a call that makes sure that 
* this will be bound to the object.
*/
app.protectThis = function(object){
	for (key in object) {
		if (object.hasOwnProperty(key)) {
			var member = object[key];
	
			if (typeof member == 'function') {
				object[key] = app.methodize(member, object);
			}
		}
	}
	return object;
};
/**
* This function takes an object, a name to the function to override and a new function that overrides the old.
* In order to pass on execution to the old function you use this(args) inside the new function. 
*/
app.override = function(self, /**The name of the function to override.*/ key, /**The child function overriding the parent.*/ child){
    var parent = self[key];
    /** @private */
    self[key] = function(){
        return child.apply(parent,arguments);
    };
};

app.getName = function(self){
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((self).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};
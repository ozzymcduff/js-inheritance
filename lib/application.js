
/*Function.prototype.method = function(name,func){
	if(!this.prototype[name]) {
		this.prototype[name]=func;
		return this;
	}
};*/

app = {};
app.toArray = function (iterable) {
		return Array.prototype.slice.call(iterable);
	};
app.methodize = function (callable, self) {
	/**
	 * inspired by Cobra.Class.method(callable, self) 
	 **/
	function method () {
		var args = app.toArray(arguments);
		return callable.apply(self, args);
	}
	method.callable = callable;
	return method;
};
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
app.override = function(self, key, child){
    var parent = self[key];
    self[key] = function(){
        return child.apply(parent,arguments);
    };
};
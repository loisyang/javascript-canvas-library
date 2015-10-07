// Your drawing library must implement the objects specified below. Your objects should have at least the methods and attributes specified below (though you may add more if you wish). The utils.js file provides a mechanism for executing inheritance, as well as other useful functions for setting default values. Inheritance has already been set up for you in the skeleton code, and you can use it for creating new objects for extra credit.

// Your objects will need to follow a specific layout protocol. There is a root entity (a Doodle) which represents the <canvas> element that you’re drawing on. Its purpose is to hold and draw all of the elements in your doodle. It cannot be rotated or translated.

// Every drawable object in a doodle has left and top coordinates. Left and top specify the reference frame for the object; when the object draws itself, it treats its left and top as the origin, (0, 0). Therefore, x and y coordinates in the attributes for an object, such as a line or a path, are relative to the object’s left and top.

/*
 * Summary: This function is an easy way to allow one object to inherit from 
 * another. For example, if you want your class Cat to inherit from class Mammal
 * (and Mammal is previously defined), you should do the following:
 * function Cat() {
 * ...
 * }
 * Cat.inheritsFrom(Mammal).
 * This function should be called in the global scope (i.e. outside the Cat constructor).
 * NOTE: you MUST call Cat.inheritsFom IMMEDIATELY AFTER your constructor. Otherwise you could run
 * into bugs.
 * This code borrowed from: http://phrogz.net/js/classes/OOPinJS2.html, see that site
 * for more details. I HIGHLY RECOMMEND READING THIS!
 */
Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) { 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else { 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
}

// useful for merging attributes with default
// Merges obj2 with obj1, returning result. If obj1 has property, obj2 overwrites that property
// If either obj1 or obj2 are undefined, DO SOMETHING TODO!!!
function mergeObjects(obj1, obj2) {
    var result = {};
    
    for (var attrname in obj1) {
        result[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        result[attrname] = obj2[attrname];
    }
    return result;
}

function mergeWithDefault(attrs, dflt) {
    var result = defaultIfUndefined(attrs, dflt);
    result = mergeObjects(dflt, attrs);
    return result;
}

function defaultIfUndefined(val, dflt) {
    if (typeof (val) == 'undefined') {
        return dflt;
    }
    return val;
}

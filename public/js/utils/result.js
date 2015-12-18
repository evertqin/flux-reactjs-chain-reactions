	"use strict";

var Result = function(){
	var _value, _message, _valid;

	this.ret = function(value){
		_value = value;
		_valid = true;
		return this;
	};

	this.fail = function(message){
		_message = message;
		_valid = false;
		return this;
	};

	this.value = function(){
		return _value;
	};

	this.message = function(){
		return _message;
	};
};

module.exports = Result;
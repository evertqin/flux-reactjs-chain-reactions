"use strict";

var StoresManager = function() {

	var _stores = [];

	this.add = function(store) {
		if (store) {
			_stores.push(store);
		}

		return this;
	};

	this.remove = function(store){
		var index = _stores.indexOf(store);

		if(index > -1){
			_stores.splice(index, 1);
		}
	};

	this.allStores = function(){
		console.log(_stores);
	};


};

module.exports = StoresManager;
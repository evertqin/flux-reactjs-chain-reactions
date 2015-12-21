"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var storesConfig = require('../configs/Config');

class StoresManager {
	constructor() {
		this._stores = {};
		this._order = [];
	}

	add(store) {
		if (!!store) {
			if (!(store in this._stores)) {
				this._stores[store.name] = store;
				this._order.push(store);
			}
		}

		// we need to handle all the previous stores
		store.dispatchToken = AppDispatcher.register(function(payload) {
			if (payload.actionType !== store.name) {
				var pre = this._order.slice(0, this._order.indexOf(payload.actionType));
				AppDispatcher.waitFor(pre.map(s => {
					return s.dispatchToken;
				}).splice(this._order.length - 1, 1));
			} else {
				store.dispatch(payload);
			}

			store.emitChange();
		}.bind(this));
	}

	remove(store) {
		var index = this._order.indexOf(store.name);

		if (index > -1) {
			this._stores.splice(index, 1);
		}

		if (store.name in this._stores) {
			delete this._stores[store.name];
		}
	}

	get allStores() {
		return this._order;
	}

	getStoreState(name) {
		return this._stores[name].state;
	}

	printAllStores() {
		console.log(this._stores);
	}

	static init() {
		var storesManager = new StoresManager();

		for(var i = 0; i < storesConfig.length; ++i){
			var store = new storesConfig[i].class(storesConfig[i].name);
			storesManager.add(store);
		}
		return storesManager;

	}

}

module.exports = StoresManager.init();

"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');

class StoresManager {
	constructor() {
		this._stores = {};
		this._order = [];
	}

	add(store) {
		console.log(store.name);
		if (!!store) {
			if (!(store in this._stores)) {
				this._stores[store.name] = store;
				this._order.push(store.name);
			}
		}

		// we need to handle all the previous stores
		store.dispatchToken = AppDispatcher.register(function(action){
			if(action.actionType !== store.name){
				AppDispatcher.waitFor(this._order.map(s => {
					return s.dispatchToken;
				}).splice(this._order.length - 1, 1));
			} else {
				store.dispatch(action);
			}

			store.emitChange();
		});
	}

	remove(store) {
		var index = this._order.indexOf(store.name);

		if (index > -1) {
			this._stores.splice(index, 1);
		}

		if(store.name in this._stores){
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

}

module.exports = StoresManager;
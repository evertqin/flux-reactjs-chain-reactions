'use strict';

var EventEmitter = require('events').EventEmitter;

class Store extends EventEmitter {
	constructor(name) {
		super();

		if (!name) {
			throw new TypeError('You must provide the name of the store');
		}

		this.name = name ? name : 'Store';
		this.state = {
			error: 'You must set the state first before using it'
		};
		this.dispatchToken = {};
	}

	update(value){
		for(let tag in value){
			if(value.hasOwnProperty(tag)){
				this.state[tag] = value[tag];
			}
		}
	}

	emitChange() {
		super.emit(this.name);
	}

	addChangeListener(callback) {
		super.on(this.name, callback);
	}

	removeChangeListener(callback) {
		super.removeListener(this.name, callback);
	}


}

module.exports = Store;
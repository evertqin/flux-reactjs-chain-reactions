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
			list: ['Universal'],
            selected: 'Universal'
		};
		this.dispatchToken = {};
	}

	update(value){
		console.log("Updating " + value);
		for(let tag in value){
			if(value.hasOwnProperty(tag)){
				this.state[tag] = value[tag];
			}
		}
	}

	dispatch(action) {
		console.log("Dispatching \"" + this.name + "\"." );
		if(!Object.is(action.value, this.state)) {
			this.update(action.value);
		}
	}

	emitChange() {
		console.log("Emitting " + this.name);
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
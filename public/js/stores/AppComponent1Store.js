'use strict';

var Store = require('./Store');

class AppComponent1Store extends Store {
	constructor(name) {
		super(name);
		this.state = {
			list: ['Universal'],
            selected: 'Universal'
		};
	}

	dispatch(action) {
		console.log("Dispatching \"" + this.name + "\"." );
		if(!Object.is(action.value, this.state)) {
			this.update(action.value);
		}
	}
}

module.exports = AppComponent1Store;
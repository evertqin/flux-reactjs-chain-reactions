'use strict';
// this is a demo store file, in most of the cases
// we can just use the default store
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
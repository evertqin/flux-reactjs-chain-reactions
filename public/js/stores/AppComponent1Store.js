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
		if(!Object.is(action.value, super.state)) {
			super.update(action.value);
		}
	}
}

module.exports = AppComponent1Store;
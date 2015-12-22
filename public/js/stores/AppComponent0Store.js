'use strict';

var Store = require('./Store');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

class AppComponent0Store extends Store {
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
			super.update(action.value);
		}
	}
}

module.exports = AppComponent0Store;
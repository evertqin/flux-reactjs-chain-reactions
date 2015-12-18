var React = require('react');
var Store = require('../stores/StoresManager.js');

class BaseComponent extends react.Component {
	constructor() {
		if(new.target === BaseComponent){
			throw new TypeError("Cannot construct Abstract instances directly");
		}
		this.name = 'base';
	}

	get stateFromStore() {
		let ret = {};
		ret[this.name] = 
	}
}

module.exports = BaseComponent;
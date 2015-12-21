'use strict';

jest.autoMockOff();

describe('StoresManager', function() {
	var storesManager = require('../StoresManager.js');
	var AppComponent0Store = require('../AppComponent0Store');

	it('Checks adding store to the store manager', function() {
		expect(storesManager.allStores.length).toBe(1);
	});
});
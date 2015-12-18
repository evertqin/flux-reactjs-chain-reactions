'use strict';

jest.dontMock('../../constants/constants');
jest.dontMock('../StoresManager');
jest.dontMock('../AppComponent0Store');
jest.dontMock('../Store');
jest.dontMock('../../dispatcher/AppDispatcher');

describe('StoresManager', function() {
	var StoresManager = require('../StoresManager.js');
	var AppComponent0Store = require('../AppComponent0Store');

	it('Creates StoresManager', function() {
		var storesManager = new StoresManager();
		expect(storesManager).not.toBe(null);
	});

	it('Checks adding store to the store manager', function() {
		const STORE_NAME = "TestStore";
		var storesManager = new StoresManager();
		var demoStore = new AppComponent0Store(STORE_NAME);
		storesManager.add(demoStore);

		expect(storesManager.allStores.length).toBe(1);
	});
});
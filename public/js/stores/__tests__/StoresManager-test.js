'use strict';

jest.dontMock('../../constants/constants');
jest.dontMock('../StoresManager');

describe('StoresManager', function() {
	var StoresManager = require('../StoresManager.js');

	it('Creates StoresManager', function() {
		var storesManager = new StoresManager();
		storesManager.add("Sample Store");
		storesManager.allStores();

	});
});
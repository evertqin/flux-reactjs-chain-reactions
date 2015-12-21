"use strict";

jest.dontMock('../AppComponent0Store');
jest.dontMock('../Store');

describe("Store", function() {
	it("creates generic Store", function() {
		const STORE_NAME = "TestStore";
		var AppComponent0Store = require('../AppComponent0Store');
		var demoStore = new AppComponent0Store(STORE_NAME);
		demoStore.demoData = {
			test: "tt"
		};
		demoStore.state = {
			dsds: "dsds"
		};
		expect(demoStore.name).toBe(STORE_NAME);
	});
});
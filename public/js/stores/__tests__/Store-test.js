"use strict";

jest.dontMock('../Store');

describe("Store", function(){
	it("creates generic Store", function(){
		var Store = require('../Store.js');
		expect(Store).not.toBe(null);
	});
});
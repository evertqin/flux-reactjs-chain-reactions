"use strict";

jest.autoMockOff();

describe("Config", function() {
	it("creates Config", function() {
		var config = require('../Config');
		expect(config).not.toBe(null);
	});
});
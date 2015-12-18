'use strict';

jest.dontMock('../ActionTypes.js');

describe('Actions', function(){
	var ActionTypes = require('../ActionTypes.js');

	it('creates global actions', function(){
		expect(ActionTypes).not.toBe(null);
	});
});

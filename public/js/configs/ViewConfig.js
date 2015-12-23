'use strict';
// I have to use another Config because of circular 
//dependency if I put it with the main config

var ViewConfig = [{
	name: 'AppComponent0',
	view: require('../components/AppComponent0'),
}, {
	name: 'AppComponent1',
	view: require('../components/AppComponent1'),
},{
	name: 'AppComponent2',
	view: require('../components/AppComponent2'),
} ];

module.exports = ViewConfig;
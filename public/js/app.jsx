'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

//var AppComponent0 = require('./components/AppComponent0');
var ViewConfig = require('./configs/ViewConfig');
var AppComponent0 = ViewConfig[0].view;
var AppComponent1 = ViewConfig[1].view;



var App = React.createClass({
	render: function(){
		return (<div>
			<AppComponent0 />
			<AppComponent1 />

			</div>);
	}
});


ReactDOM.render(<App/>, document.getElementById('input'));
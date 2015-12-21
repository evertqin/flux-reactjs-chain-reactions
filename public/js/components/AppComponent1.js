'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

var AppComponent1 = React.createClass({
	propTypes: {
		url: React.PropTypes.string.isRequired
	},

	getDefaultProps: function() {
		return {
			url: '/Analysis/MethodTypes'
		};
	},

	getInitialState: function() {
		return StoresManager.getStoreState('AppComponent1');
	},

	componentDidMount: function() {
		ajaxGet.call(this, this.props.url, {}).then(this._onChange);

	},

	componentWillUnmount: function() {
		// AnalysisInputStores.removeChangeListener(this._onChange);
	},

	_onChange: function(value) {
		Actions.excute('AppComponent1', value);
		this.setState(StoresManager.getStoreState('AppComponent1'));
	},

	render: function() {
		return React.createElement(UserControls.AnalysisDropDown, {
			dataSource: this.state.list,
			selected: this.state.selected,
			selectChange: this._onChange
		});
	}
});

module.exports = AppComponent1;
'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

var AppComponent0 = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		url: React.PropTypes.string.isRequired
	},

	getDefaultProps: function() {
		return {
			name : 'AppComponent0', // change this
			url: '/Analysis/MethodTypes'
		};
	},

	getInitialState: function() {
		return StoresManager.getStoreState(this.props.name);
	},

	componentDidMount: function() {
		ajaxGet.call(this, this.props.url, {}).then(this._onChange);

	},

	componentWillUnmount: function() {
		// AnalysisInputStores.removeChangeListener(this._onChange);
	},

	_onChange: function(value) {
		Actions.excute(this.props.name, value);
		this.setState(StoresManager.getStoreState(this.props.name));
	},

	render: function() {
		return React.createElement(UserControls.AnalysisDropDown, {
			dataSource: this.state.list,
			selected: this.state.selected,
			selectChange: this._onChange
		});
	}
});

module.exports = AppComponent0;
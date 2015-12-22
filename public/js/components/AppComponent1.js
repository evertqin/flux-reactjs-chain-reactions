'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

var AppComponent1 = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
        methodType: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
    },

	getDefaultProps: function () {
        return {
        	name : 'AppComponent1', // change this
        	methodType: 'Universal',
            url: '/Analysis/FilesForProcessing',
        };
    },

	getInitialState: function() {
		return StoresManager.getStoreState(this.props.name);
	},

	componentDidMount: function() {
		//Here should attach event listener to upstream store
		StoresManager.addListener('AppComponent0', this._onMethodTypeChange);
		ajaxGet.call(this, this.props.url,
          {
              methodType: this.props.methodType
          }).then(this._onChange);
	},

	componentWillUnmount: function() {
		StoresManager.removeListener('AppComponent0', this._onMethodTypeChange);
	},

	_onChange: function(value) {
		Actions.excute(this.props.name, value);
		this.setState(StoresManager.getStoreState(this.props.name));
	},

	_onMethodTypeChange: function () {
        ajaxGet.call(this, this.props.url,
          {
              methodType: StoresManager.getStoreState("AppComponent0").selected
          }).then(this._onChange);
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
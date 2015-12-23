'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var BaseComponent = require('./AppComponent0');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

class AppComponent1 extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = StoresManager.getStoreState(props.name);
		// we need to manually bind this to custom methods
		//https://github.com/goatslacker/alt/issues/283
		this._onMethodTypeChange = this._onMethodTypeChange.bind(this);
	}

	componentDidMount() {
		//Here should attach event listener to upstream store
		StoresManager.addListener(BaseComponent.name, this._onMethodTypeChange);
	}

	componentWillUnmount() {
		StoresManager.removeListener(BaseComponent.name, this._onMethodTypeChange);
	}

	_onMethodTypeChange() {
		ajaxGet.call(this, this.props.url, {
			root: StoresManager.getStoreState(BaseComponent.name).selected
		}).then(this._onChange);
	}

	render() {
		return React.createElement(UserControls.AnalysisDropDown, {
			dataSource: this.state.list,
			selected: this.state.selected,
			selectChange: this._onChange
		});
	}
}

AppComponent1.propTypes = {
	name: React.PropTypes.string.isRequired,
	root: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

AppComponent1.defaultProps = {
	name: 'AppComponent1', // change this
	root: '.android',
	url: '/Analysis/level0',
};
// var AppComponent1 = React.createClass({
// 	propTypes: {
// 		name: React.PropTypes.string.isRequired,
// 		methodType: React.PropTypes.string.isRequired,
// 		url: React.PropTypes.string.isRequired
// 	},

// 	getDefaultProps: function() {
// 		return {
// 			name: 'AppComponent1', // change this
// 			methodType: 'Universal',
// 			url: '/Analysis/FilesForProcessing',
// 		};
// 	},

// 	getInitialState: function() {
// 		return StoresManager.getStoreState(this.props.name);
// 	},

// 	componentDidMount: function() {
// 		//Here should attach event listener to upstream store
// 		StoresManager.addListener('AppComponent0', this._onMethodTypeChange);
// 		ajaxGet.call(this, this.props.url, {
// 			methodType: this.props.methodType
// 		}).then(this._onChange);
// 	},

// 	componentWillUnmount: function() {
// 		StoresManager.removeListener('AppComponent0', this._onMethodTypeChange);
// 	},

// 	_onChange: function(value) {
// 		Actions.excute(this.props.name, value);
// 		this.setState(StoresManager.getStoreState(this.props.name));
// 	},

// 	_onMethodTypeChange: function() {
// 		ajaxGet.call(this, this.props.url, {
// 			methodType: StoresManager.getStoreState("AppComponent0").selected
// 		}).then(this._onChange);
// 	},

// 	render: function() {
// 		return React.createElement(UserControls.AnalysisDropDown, {
// 			dataSource: this.state.list,
// 			selected: this.state.selected,
// 			selectChange: this._onChange
// 		});
// 	}
// });

module.exports = AppComponent1;
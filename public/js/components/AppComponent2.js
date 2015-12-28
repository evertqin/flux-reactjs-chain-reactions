'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var BaseComponent = require('./AppComponent1');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

class AppComponent2 extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = StoresManager.getStoreState(props.name);
		// we need to manually bind this to custom methods
		//https://github.com/goatslacker/alt/issues/283
		this._onFilesChange = this._onFilesChange.bind(this);
	}

	componentDidMount() {
		//Here should attach event listener to upstream store
		StoresManager.addListener(BaseComponent.name, this._onFilesChange);
	}

	componentWillUnmount() {
		StoresManager.removeListener(BaseComponent.name, this._onFilesChange);
	}

	_onFilesChange() {
		if (StoresManager.getStoreState(BaseComponent.name).selected) {
			ajaxGet.call(this, this.props.url, {
					root: StoresManager.getStoreState('AppComponent0').selected,
					level0: StoresManager.getStoreState(BaseComponent.name).selected
				})
				.then(this._onChange);
		}
	}

	render() {
		return React.createElement(UserControls.AnalysisDropDown, {
			dataSource: this.state.list,
			selected: this.state.selected,
			selectChange: this._onChange
		});
	}
}

AppComponent2.propTypes = {
	name: React.PropTypes.string.isRequired,
	root: React.PropTypes.string.isRequired,
	level0: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

AppComponent2.defaultProps = {
	name: 'AppComponent2', // change this
	root: '.android',
	level0: 'test',
	url: '/Analysis/level1',
};

module.exports = AppComponent2;
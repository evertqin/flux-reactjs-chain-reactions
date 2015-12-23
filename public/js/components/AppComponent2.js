'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var AppComponent1 = require('./AppComponent1');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

class AppComponent2 extends AppComponent1 {
	constructor(props) {
		super(props);
		this.state = StoresManager.getStoreState(props.name);
		// we need to manually bind this to custom methods
		//https://github.com/goatslacker/alt/issues/283
		this._onFilesChange = this._onFilesChange.bind(this);
	}

	componentDidMount() {
		//Here should attach event listener to upstream store
		StoresManager.addListener('AppComponent1', this._onFilesChange);

	}

	componentWillUnmount() {
		StoresManager.removeListener('AppComponent1', this._onFilesChange);

	}

	_onFilesChange() {
		if (StoresManager.getStoreState('AppComponent1').selected) {
			ajaxGet.call(this, this.props.url, {
					methodType: StoresManager.getStoreState('AppComponent0').selected,
					filename: StoresManager.getStoreState('AppComponent1').selected
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
	methodType: React.PropTypes.string.isRequired,
	files: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

AppComponent2.defaultProps = {
	name: 'AppComponent2', // change this
	methodType: '.android',
	files: 'test',
	url: '/Analysis/DemoList',
};

module.exports = AppComponent2;
'use strict';

var React = require('react');
var StoresManager = require('../stores/StoresManager');
var Actions = require('../actions/Actions');
var UserControls = require('./UserControls.jsx');
var utils = require('../utils/AjaxUtils');

var ajaxGet = utils.ajaxGet;

class BaseComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = StoresManager.getStoreState(props.name);
		// we need to manually bind this to custom methods
		//https://github.com/goatslacker/alt/issues/283
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		console.log("calling base componentDid mount");
		ajaxGet.call(this, this.props.url, {}).then(this._onChange);

	}

	componentWillUnmount() {
		// AnalysisInputStores.removeChangeListener(this._onChange);
	}

	_onChange(value) {
		Actions.excute(this.props.name, value);
		this.setState(StoresManager.getStoreState(this.props.name));
	}

	render() {
		return React.createElement(UserControls.AnalysisDropDown, {
			dataSource: this.state.list,
			selected: this.state.selected,
			selectChange: this._onChange
		});
	}
}

BaseComponent.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

BaseComponent.defaultProps = {
	name: 'BaseComponent', // change this
	url: '/Analysis/MethodTypes'
};

module.exports = BaseComponent;
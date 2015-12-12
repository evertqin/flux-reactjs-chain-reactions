var React = require('react');
var ReactPropTypes = React.PropTypes;
var commonConstants = require('../Constants/common.js');
var UserControls = require('./PgiIndexAnalysisUserControls.jsx');
var AnalysisInputActions = require('../actions/AnalysisInputActions.js');
var AnalysisStores = require('../stores/AnalysisStores');
var utils = require('../utils/AjaxUtils.js');

var ajaxGet = utils.ajaxGet;

function getStateFromStores() {
    return {
        methodType: AnalysisStores.AnalysisMethodStores.getMethodType()
    };
}

var AnalysisMethodTypeInput = React.createClass({
    propTypes: {
        // methodType: ReactPropTypes.object.isRequired,
        url: ReactPropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            //methodType: {
            //    methodTypeList: Object.keys(commonConstants.CubeType),
            //    selected: commonConstants.CubeType[0]
            //},
            url: "/Analysis/MethodTypes"
        };
    },

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        //AnalysisInputStores.addChangeListener(this._onChange);
        ajaxGet.call(this, this.props.url, {}).then(this._onChange);

    },

    componentWillUnmount: function() {
       // AnalysisInputStores.removeChangeListener(this._onChange);
    },

    render: function() {
        return (<UserControls.AnalysisDropDown dataSource={this.state.methodType.list}
                selected={this.state.methodType.selected}
                selectChange={this._onChange} />
        );
    },

    _onChange: function(newMethodTypeValue) {
        AnalysisInputActions.changeMethodType(newMethodTypeValue);
        this.setState(getStateFromStores());
    }

});

module.exports = AnalysisMethodTypeInput;
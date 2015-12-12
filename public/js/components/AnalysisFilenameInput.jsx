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
        //methodType: AnalysisStores.AnalysisMethodStores.getMethodType(),
        files: AnalysisStores.AnalysisFilesStores.getFiles()
    };
}

var AnalysisFilenameInput = React.createClass({
    propTypes: {
        methodType: ReactPropTypes.object.isRequired,
        url: ReactPropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            url: "/Analysis/FilesForProcessing",
        };
    },

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function () {
        AnalysisStores.AnalysisMethodStores.addChangeListener(this._onMethodTypeChange);
        ajaxGet.call(this, this.props.url,
          {
              methodType: this.props.methodType.selected
          }).then(this._onChange);
    },

    componentWillUnmount: function() {
        AnalysisStore.AnalysisMethodStores.removeChangeListener(this._onMethodTypeChange);
    },

    render: function () {
        return <UserControls.AnalysisDropDown labelText="File For Processing"
        dataSource={this.state.files.list}
        selectChange={this._onChange}
        selected={this.state.files.selected} />
    },

    _onChange: function (newFilesValue) {
        AnalysisInputActions.changeFiles(newFilesValue);
        this.setState(getStateFromStores());
    },

    _onMethodTypeChange: function () {
        ajaxGet.call(this, this.props.url,
          {
              methodType: AnalysisStores.AnalysisMethodStores.getMethodType().selected
          }).then(this._onChange);
    }

});

module.exports = AnalysisFilenameInput;
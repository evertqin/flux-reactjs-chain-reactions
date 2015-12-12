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
        feature: AnalysisStores.AnalysisFeatureStores.getFeature()
    }
}

var AnalysisFirstFeatureInput = React.createClass({
    propTypes: {
        methodType: ReactPropTypes.object.isRequired,
        files: ReactPropTypes.object.isRequired,
        url: ReactPropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            url: "/Analysis/FirstFeatureList",
            methodType: {
                methodTypeList: Object.keys(commonConstants.CubeType),
                selected: commonConstants.CubeType[0]
            },
            files: {
                list: [],
                selected: ""
            },
        };
    },

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function () {
        AnalysisStores.AnalysisMethodStores.addChangeListener(this._onMethodTypeChange);

    },

    componentWillUnmount: function() {
        AnalysisStore.AnalysisMethodStores.removeChangeListener(this._onMethodTypeChange);

    },

    render: function () {
        return <UserControls.AnalysisDropDown labelText="First Feature"
                                              dataSource={this.state.feature.list}
                                              selectChange={this._onChange}
                                              selected={this.state.feature.selected} />
    },

    _onChange: function(newFeatureValue) {
        AnalysisInputActions.changeFirstFeature(newFeatureValue);
        console.log(newFeatureValue);
        this.setState(getStateFromStores());
    },

    _onMethodTypeChange: function() {
        ajaxGet.call(this, '/api/AnalysisInput/FilesForProcessing',
        {
            methodType: AnalysisStores.AnalysisMethodStores.getMethodType().selected
        }).then(function(files) {
            AnalysisInputActions.changeFiles(files);
            this._onFilesChange();
        }.bind(this));
    },

    _onFilesChange: function () {
        ajaxGet.call(this, this.props.url,
          {
              methodType: AnalysisStores.AnalysisMethodStores.getMethodType().selected,
              filename: AnalysisStores.AnalysisFilesStores.getFiles().selected
          })
          .then(this._onChange);
    },
    
});

module.exports = AnalysisFirstFeatureInput;
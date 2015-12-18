var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var commonConstants = require('../constants/constants.js');
var UserControls = require('./PgiIndexAnalysisUserControls.jsx');
var AnalysisMethodTypeInput = require('./AnalysisMethodTypeInput.jsx');
var AnalysisFilenameInput = require('./AnalysisFilenameInput.jsx');
var AnalysisDemoListInput = require('./AnalysisDemoListInput.jsx');

var AnalysisStores = require('../stores/AnalysisStores');
var utils = require('../utils/AjaxUtils.js');

var ajaxGet = utils.ajaxGet;

'use strict'



var lazyUpdate = function(type, key, newValue) {
    // need to bind this
    if (!this[type]) {
        throw "Need to use call to set this of the updateProps function";
    }

    if (type !== "state" && type !== "props") {
        throw "type can only be \"state\" or \"props\"";
    }

    var oldValue = this[type][key]|| {};

    for (var tag in newValue) {
        oldValue[tag] = newValue[tag];
    }

    return oldValue;
};







var HeaderFieldsToGroupBy = React.createClass({
    getDefaultProps: function () {
        return {
            featuresForAnalysis: {
                list: [],
                selected: [],
            }
        };
    },

    handleChange: function (value) {
        return this.props.selectChange("featuresForAnalysis", value);
    },

    componentWillReceiveProps: function(nextProps) {
        if (Object.is(this.props.feature, nextProps.feature)) {
            return;
        }

        var fullFeatureList = nextProps.feature.list || this.props.feature.list;
        var selectedFeature = nextProps.feature.selected || this.props.feature.selected;

        var headerFieldsList = fullFeatureList.slice(fullFeatureList.indexOf(selectedFeature) + 1);
        return this.handleChange({ list: headerFieldsList , selected:[]});
    },

    render: function () {
        return (
            <UserControls.AnalysisMultipleSelection
                dataSource={this.props.featuresForAnalysis.list}
                selectChange={this.handleChange}
                selected={this.props.featuresForAnalysis.selected}/>
        );

    }
});

var AnalysisPanel = React.createClass({
    getInitialState: function () {
        return {
            methodType: {
                list: Object.keys(commonConstants.methodTypes),
                selected: 'Universal',
            },
            files: {
                list: [],
                selected: ""
            },
            feature: {
                list: [],
                selected: "",
            },
            featuresForAnalysis: {
                list: [],
                selected: [],
            }

        };
    },
    handleSelectChange: function (key, value) {

        var obj = {};
        obj[key] = lazyUpdate.call(this, "state", key, value);
        this.setState(obj);
    },
    render: function () {
        return (
            <div>
            <AnalysisMethodTypeInput />

            <AnalysisFilenameInput methodType={AnalysisStores.AnalysisMethodStores.getMethodType()}/>
            <AnalysisDemoListInput methodType={AnalysisStores.AnalysisMethodStores.getMethodType()} files={AnalysisStores.AnalysisFilesStores.getFiles()}
                               />
            <HeaderFieldsToGroupBy feature={this.state.feature}
                                   featuresForAnalysis={this.state.featuresForAnalysis}
                                   selectChange={this.handleSelectChange}/>
            </div>

          );
    }

});

module.exports = AnalysisPanel;

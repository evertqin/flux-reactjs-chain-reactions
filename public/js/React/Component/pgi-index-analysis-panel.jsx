var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var commonConstants = require('../Constants/common.js');
var UserControls = require('./pgi-index-analysis-user-controls.jsx');

'use strict'

var ajaxGet = function (url, data) {
    var that = this;

    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                if (that.isMounted()) {
                    if (!!data) {
                        resolve({ list: data, selected: data[0] });
                    }
                }
            },
            error: function (xhr, err, status) {
                console.error(xhr, err, status);
                reject(err);
            }
        });
    });

    return promise;

}

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

var AnalysisTypeInput = React.createClass({
    getDefaultProps: function () {
        return {
            methodType: {
                methodTypeList: Object.keys(commonConstants.CubeType),
                selected: commonConstants.CubeType[0]
            },
            url: "/api/AnalysisInput/MethodTypes"
        };
    },

    componentDidMount: function () {
        ajaxGet.call(this, this.props.url, {}).then(this.handleChange);
    },

    handleChange: function (value) {
        return this.props.selectChange("methodType", value);
    },

    render: function () {
        return (<UserControls.AnalysisDropDown dataSource={this.props.methodType.list}
                                               selected={this.props.methodType.selected}
                                               selectChange={this.handleChange} />
    );
    }
});

var AnalysisFilenameInput = React.createClass({
    getDefaultProps: function () {
        return {
            url: "/api/AnalysisInput/FilesForProcessing",
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
    handleChange: function (value) {
        return this.props.selectChange("files", value);
    },

    componentWillReceiveProps: function (nextProps) {
        if (Object.is(nextProps.methodType, this.props.methodType)) {
            return;
        }
        ajaxGet.call(this, this.props.url,
          { methodType: nextProps.methodType.selected })
          .then(this.handleChange);

    },

    componentDidMount: function () {
        ajaxGet.call(this, this.props.url,
          {
              methodType: this.props.methodType.selected
          }).then(this.handleChange);
    },
    render: function () {
        return <UserControls.AnalysisDropDown labelText="File For Processing"
                                              dataSource={this.props.files.list}
                                              selectChange={this.handleChange}
                                              selected={this.props.files.selected} />
    }
});

var FirstFeatureInput = React.createClass({
    getDefaultProps: function () {
        return {
            url: "/api/AnalysisInput/FirstFeatureList",
            methodType: {
                methodTypeList: Object.keys(commonConstants.CubeType),
                selected: commonConstants.CubeType[0]
            },
            files: {
                list: [],
                selected: ""
            },
            feature: {
                list: [],
                selected: "",
            },
        };
    },

    handleChange: function (value) {
        return this.props.selectChange("feature", value);
    },
    componentWillReceiveProps: function (nextProps) {
        // we need a hirachy so we check if files are changed for first feature
        if (Object.is(this.props.files, nextProps.files)) {
            return;
        }
        // implement an ajax hashTable to filter
        ajaxGet.call(this, this.props.url,
          {
              methodType: nextProps.methodType.selected,
              filename: nextProps.files.selected
          })
          .then(this.handleChange);
    },
    componentDidMount: function () {
        // the result depends on ajax of filename, so we ski this function

    },

    render: function () {
        return <UserControls.AnalysisDropDown labelText="First Feature"
                                              dataSource={this.props.feature.list}
                                              selectChange={this.handleChange}
                                              selected={this.props.feature.selected} />
    }
});

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
                list: Object.keys(commonConstants.CubeType),
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
            <AnalysisTypeInput methodType={this.state.methodType}
                               selectChange={this.handleSelectChange} />

            <AnalysisFilenameInput methodType={this.state.methodType}
                                   files={this.state.files}
                                   selectChange={this.handleSelectChange} />
            <FirstFeatureInput methodType={this.state.methodType}
                               files={this.state.files}
                               feature={this.state.feature} 
                               selectChange={this.handleSelectChange} />
            <HeaderFieldsToGroupBy feature={this.state.feature} 
                                   featuresForAnalysis={this.state.featuresForAnalysis}
                                   selectChange={this.handleSelectChange}/>
            </div>

          );
    }

});

module.exports = AnalysisPanel;

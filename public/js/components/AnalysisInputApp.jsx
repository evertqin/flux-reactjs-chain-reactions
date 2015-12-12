var React = require('react');
var AnalysisPanel = require('./PgiIndexAnalysisPanel.jsx');
var AnalysisStores = require('../stores/AnalysisStores');

function getInputState() {
    return {
        methodType: AnalysisStores.AnalysisMethodStores.getMethodType(),
        files: AnalysisStores.AnalysisFilesStores.getFiles(),
        feature: AnalysisStores.AnalysisFeatureStores.getFeature(),
        //featuresForAnalysis: AnalysisInputStore.getFeatureForAnalysis()
    };
};

var AnalysisInputApp = React.createClass({
    getInitialState: function() {
        return getInputState();
    },

    componentDidMount: function() {
        AnalysisStores.AnalysisMethodStores.addChangeListener(this._onchange);
        AnalysisStores.AnalysisFilesStores.addChangeListener(this._onchange);

    },

    componentWillUnmount: function() {
        AnalysisStores.AnalysisMethodStores.removeChangeListener(this._onchange);
        AnalysisStores.AnalysisFilesStores.removeChangeListener(this._onchange);

    },

    render: function() {
        return(
            <AnalysisPanel />
            );
    },


    _onchange: function() {
        this.setState(getInputState());
    }
});

module.exports = AnalysisInputApp;

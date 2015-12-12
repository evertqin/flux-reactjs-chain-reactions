var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var PGIBanner = require('./Component/pgi-banner.jsx');
var AnalysisHistory = require('./Component/pgi-index-analysis-history.jsx');
var AnalysisPanel = require('./Component/pgi-index-analysis-panel.jsx');


// we first need to do some bootstrapping for cross browser compatibility
Object.is = Object.is ? Object.is : function(obj0, obj1) {
    if (typeof obj0 !== typeof obj1) {
        return false;
    }

    if (typeof obj0 !== 'object') {
        return false;
    }

    if (obj0.keys.length !== obj1.keys.length) {
        return false;
    }

    for (var key in obj0.keys) {
        if (!obj1.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
};

$(document).ready(function() {
    ReactDOM.render(
        <AnalysisHistory />, document.getElementById("analysisHistory")
    );
    ReactDOM.render(
    <AnalysisPanel />, document.getElementById("analysisSetup")
    );
});


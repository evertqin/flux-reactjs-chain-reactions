var React = require('react');
var ReactDOM = require('react-dom');
var GetHistoryBtn = require('./pgi-index-analysis-history-button.jsx');

var AnalysisHistory = React.createClass({
    render: function() {
        return (
            <GetHistoryBtn />
        );
    }
});

module.exports = AnalysisHistory;
var React = require('react');
var ReactDOM = require('react-dom');

var GetHistoryBtn = React.createClass({
    render: function() {
        return (
            <button type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-file" aria-hidden="true"></span>
                <span>Get Analysis Results From Prior Sessions</span>
            </button>
        );
    }
});

module.exports = GetHistoryBtn;
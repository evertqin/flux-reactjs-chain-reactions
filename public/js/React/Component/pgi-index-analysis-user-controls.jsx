var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
var commonConstants = require('../Constants/common.js');

var UserControls = {
    AnalysisMultipleSelection: React.createClass({
        getDefaultProps: function () {
            return {
                dataSource: ["Action", "Another action", "Something else here", "Separate link"],
                selected: []
            };
        },

        handleSelect: function (event) {
            // this is a multiple selection, so we need to maintain a selected state
            var currentSelected = event.target.value;
            var selectedItems = this.state.selected || [];
            if (selectedItems.indexOf(currentSelected) < 0) {
                selectedItems.push(currentSelected);
            }

            this.props.selectChange({selected: currentSelected });

        },

        render: function () {
            var ListItems = this.props.dataSource.map(function (item, index) {
                return (
                    <div key={index}>
                    <input type="checkbox"  name={item} value={item} />{item} <br />
                    </div>


            );
            }.bind(this));

            return (
                <div id="feature-select" value={this.props.selected} onChange={this.handleSelect}>
                    {ListItems}
                </div>

            );
        }
    }),
    AnalysisDropDown: React.createClass({
        getDefaultProps: function () {
            return {
                dataSource: ["Action", "Another action",  "Separate link"],
                selected: ""
            };
        },
        handleSelect: function (event) {
            this.props.selectChange({ selected: event.target.value });
        },
        render: function () {
            var ListItems = this.props.dataSource.map(function (item, index) {
                return (
                    <option key={index} value={item}>{item}</option>
                );
            }.bind(this));

            return (
                <select value={this.props.selected} onChange={this.handleSelect}>
                    {ListItems}

                </select>

                );
        }
    }),
};


module.exports = UserControls;

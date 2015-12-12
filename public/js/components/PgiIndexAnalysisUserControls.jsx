var React = require('react');
var ReactPropTypes = React.PropTypes;
var commonConstants = require('../Constants/common.js');

var UserControls = {
    AnalysisMultipleSelection: React.createClass({
        propTypes: {
            dataSource: ReactPropTypes.array.isRequired,
            selected: ReactPropTypes.array.isRequired,
            selectChange: ReactPropTypes.func.isRequired
        },

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
        propTypes: {
            dataSource: ReactPropTypes.array.isRequired,
            selected: ReactPropTypes.string.isRequired,
            selectChange: ReactPropTypes.func.isRequired
        },

        getDefaultProps: function () {
            return {
                dataSource: ["Action", "Another action",  "Separate link"],
                selected: ""
            };
        },
        render: function () {
            var ListItems = this.props.dataSource.map(function (item, index) {
                return (
                    <option key={index} value={item}>{item}</option>
                );
            }.bind(this));

            return (
                <select value={this.props.selected} onChange={this._onChange}>
                    {ListItems}
                </select>
                );
        },

        _onChange: function(event){
            this.props.selectChange({selected: event.target.value});
        }
    }),
};


module.exports = UserControls;

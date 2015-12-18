var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');
var ActionTypes = require('./Actions')


var Actions = {
	excute: function(actionType, value){
		AppDispatcher.dispatch({
			actionType:actionType,
			value: value;
		});
	}
};

module.exports = Actions;

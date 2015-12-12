var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AnalysisInputConstants = require('../constants/common.js');

var ActionTypes = AnalysisInputConstants.ActionsTypes;

var AnalysiInputActions = {
    changeMethodType: function(newMethodTypeValue) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CHANGE_METHODTYPE,
            value: newMethodTypeValue
        });
    },
    changeFiles: function(newFilesValue) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CHANGE_FILES,
            value:newFilesValue
        });
    },
    changeFirstFeature: function(newFirstFeatureValue) {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CHANGE_FIRSTFEATURE,
            value:newFirstFeatureValue
        });
    }

};

module.exports = AnalysiInputActions;

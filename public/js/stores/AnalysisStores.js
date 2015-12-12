var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var AnalysisInputConstants = require('../constants/common.js');
var assign = require('object-assign');
Object.is = Object.is ? Object.is : require('object-is');

var ActionsTypes = AnalysisInputConstants.ActionsTypes;
var EventTypes = AnalysisInputConstants.EventTypes;
//const CHANGE_EVENT = "change";
//const CHANGE_METHOD = "change_method";
//const CHANGE_FILES = "change_files";

//var _analysisInput = {
//    methodType: {
//        list: Object.keys(AnalysisInputConstants.CubeType),
//        selected: 'Universal'
//    },
//    files: {
//        list: [],
//        selected: ""
//    },
//    feature: {
//        list: [],
//        selected: ""
//    },
//    featuresForAnalysis: {
//        list: [],
//        selected: []
//    }
//};


/**
 * 
 * @param {string} tag names, can be methodType, files, feature, featuresForAnalysis, ... 
 * @param {object} object containing updated object, can be a partial object
 * @returns {} 
 */
function _update(value) {
    for (let tag in value) {
        if (value.hasOwnProperty(tag)) { // avoid checking prototype properties
           this[tag] = value[tag];
        }
    }
}

var AnalysisStores = {
    AnalysisMethodStores: assign({}, EventEmitter.prototype, {
        type: "methodType",

        methodType: {
            list: Object.keys(AnalysisInputConstants.CubeType),
            selected: 'Universal'
        },

        /**
         * Get MethodType including all supported methodTypes and currently selected methodType
         * @returns {} 
         */
        getMethodType: function() {
            return this.methodType;
        },

        update: function (value) {
            _update.call(this.methodType, value);
        },

        emitChange: function () {
            this.emit(EventTypes.CHANGE_METHOD);
        },
        /**
         * @param {function} callback 
         */
        addChangeListener: function (callback) {
            this.on(EventTypes.CHANGE_METHOD, callback);
        },

        removeChangeListener: function (callback) {
            this.removeListener(EventTypes.CHANGE_METHOD, callback);
        }
    }),

    AnalysisFilesStores: assign({}, EventEmitter.prototype, {
        files: {
            list: [],
            selected: ""
        },

        getFiles: function() {
            return this.files;
        },

        update: function (value) {
            _update.call(this.files, value);
        },
        emitChange: function () {
            this.emit(EventTypes.CHANGE_FILES);
        },
        /**
         * @param {function} callback 
         */
        addChangeListener: function (callback) {
            this.on(EventTypes.CHANGE_FILES, callback);
        },

        removeChangeListener: function (callback) {
            this.removeListener(EventTypes.CHANGE_FILES, callback);
        }
    }),

    AnalysisFeatureStores: assign({}, EventEmitter.prototype, {
        feature: {
            list: [],
            selected: ""
        },

        getFeature: function() {
            return this.feature;
        },

        update: function (value) {
            _update.call(this.feature, value);
        },

        emitChange: function () {
            this.emit(EventTypes.ChANGE_FIRSTFEATURE);
        },
        /**
         * @param {function} callback 
         */
        addChangeListener: function (callback) {
            this.on(EventTypes.CHANGE_FIRSTFEATURE, callback);
        },

        removeChangeListener: function (callback) {
            this.removeListener(EventTypes.CHANGE_FIRSTFEATURE, callback);
        }

    }),

    FeatureForAnalysisStores: assign({}, EventEmitter.prototype, {
        featuresForAnalysis: {
            list: [],
            selected: []
        },

        getFeatureForAnalysis: function() {
            return this.featuresForAnalysis;
        },

        update: function (value) {
            _update.call(this.featuresForAnalysis, value);
        }
    })
};

AnalysisStores.AnalysisMethodStores.dispatchToken = AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionsTypes.CHANGE_METHODTYPE:
            if (!Object.is(action.value, AnalysisStores.AnalysisMethodStores.getMethodType())) {
                AnalysisStores.AnalysisMethodStores.update(action.value);
                AnalysisStores.AnalysisMethodStores.emitChange();

            }
            break;
        default:
            break;
    }
});


AnalysisStores.AnalysisFilesStores.dispatchToken = AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionsTypes.CHANGE_METHODTYPE:
            AppDispatcher.waitFor([AnalysisStores.AnalysisMethodStores.dispatchToken]);
            AnalysisStores.AnalysisFilesStores.emitChange();
            break;
        case ActionsTypes.CHANGE_FILES:
            if (!Object.is(action.value, AnalysisStores.AnalysisFilesStores.getFiles())) {
                AnalysisStores.AnalysisFilesStores.update(action.value);
                AnalysisStores.AnalysisFilesStores.emitChange();
            }
            break;
    default:
        break;
    }
});

AnalysisStores.AnalysisFeatureStores.dispatchToken = AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case ActionsTypes.CHANGE_METHODTYPE:
            AppDispatcher.waitFor([AnalysisStores.AnalysisMethodStores.dispatchToken, AnalysisStores.AnalysisFilesStores.dispatchToken]);
            AnalysisStores.AnalysisFeatureStores.emitChange();
            break;
        case ActionsTypes.CHANGE_FILES:
                AppDispatcher.waitFor([AnalysisStores.AnalysisFilesStores.dispatchToken]);
                AnalysisStores.AnalysisFeatureStores.emitChange();
            break;
        case ActionsTypes.CHANGE_FIRSTFEATURE:
            if (!Object.is(action.value, AnalysisStores.AnalysisFeatureStores.getFeature())) {
                AnalysisStores.AnalysisFeatureStores.update(action.value);
                AnalysisStores.AnalysisFeatureStores.emitChange();
            }
            break;
        default:
            break;
    }
});


//AnalysisInputStore.dispatchToken = AppDispatcher.register(function (action) {
//    switch (action.actionType) {
//    case ActionsTypes.CHANGE_METHODTYPE:

//        if (!Object.is(action.value, AnalysisInputStore.getMethodType())) {
//            update("methodType", action.value);
//            AnalysisInputStore.emitChange();
//        }
//        break;
//    case ActionsTypes.CHANGE_FILES:
//        if (!Object.is(action.value, AnalysisInputStore.getFiles())) {
//            update("files", action.value);
//            AnalysisInputStore.emitChange();
//        }
//        break;
//    case ActionsTypes.CHANGE_FIRSTFEATURE:
//        if (!Object.is(action.value, AnalysisInputStore.getFeature())) {
//            update("feature", action.value);
//            AnalysisInputStore.emitChange();
//        }
//    default:
//        break;
//    }
//});

module.exports = AnalysisStores;
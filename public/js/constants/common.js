var keyMirror = require('keymirror');

var commonConstants = {
    CubeType: {
        Universal: 0,
        SmartCube: 1,
        PhenoCube: 2,
        NeuroCube: 3,
        ChemicalStructure: 6
    },
    ActionsTypes: keyMirror({
        CHANGE_METHODTYPE: null,
        CHANGE_FILES: null,
        CHANGE_FIRSTFEATURE: null,
    }),
    EventTypes: {
        CHANGE_METHOD: "change_method",
        CHANGE_FILES: "change_files",
        CHANGE_FIRSTFEATURE: "change_firstfeature"
    }
};


module.exports = commonConstants;
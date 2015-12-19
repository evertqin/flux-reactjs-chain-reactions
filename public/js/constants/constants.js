var keyMirror = require('keymirror');

var constants = {
        methodTypes :  {
          Type0: 0,
          Type1: 1,
          Type2: 2,
          Type3: 3

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
    },
};


module.exports = constants;
var $ = require('jquery');



function AjaxHash() {
    var hash = {};

    function alreadyCalled(url, data) {
        var info = JSON.stringify({ url: url, data: data });
        return hash.hasOwnProperty(info);
    }

    function add(url, data) {
        var info = JSON.stringify({ url: url, data: data });

        if (!hash.hasOwnProperty(info)) {
            hash[info] = true;
            return info;
        }
        return function() {

        }
    }

    function finish(url, data) {
        var info = JSON.stringify({ url: url, data: data });

        if (hash.hasOwnProperty(info)) {
            delete hash[info];
        }
    }

    return {
        alreadyCalled: alreadyCalled,
        add: add,
        finish: finish
    }

}

var hash = new AjaxHash();

module.exports = {

    ajaxGet: function(url, data) {
        var that = this;

        var promise = new Promise(function (resolve, reject) {
           // if (!hash.alreadyCalled(url, data)) {
                hash.add(url, data);
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    success: function(ret, status) {
                        if (that.isMounted()) {
                            if (!!ret) {
                                resolve({ list: ret, selected: ret[0] });
                            }
                        }
                        hash.finish(url, data);
                    },
                    error: function(xhr, err, status) {
                        console.error(xhr, err, status);
                        reject(err);
                        hash.finish(url, data);
                    }
                });
            //}
        });

        return promise;

    },

};

/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", { presets: ["react", "es2015"] }]
                    ],
                    noParse: ["~/node_modules/jQuery/**/*", "~/node_modules/react/**/*", "~/node_modules/react-dom/**/*"],
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    "Scripts/app-bundle.js": ["Scripts/app.jsx"]
                }
            }

        },
        watch: {
            files: ["Scripts/**/*.jsx", "Scripts/**/*.js", "!Scripts/app-bundle.js"],

            tasks: ["browserify"]
        }
    });

    grunt.registerTask('default', ['watch']);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

};

/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            presets: ["react", "es2015"]
                        }]
                    ],
                    noParse: ["~/node_modules/jquery/**/*", "~/node_modules/react/**/*", "~/node_modules/react-dom/**/*"],
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    "public/build/js/app-bundle.js": ["public/js/App.jsx"]
                }
            }

        },

        sass: {
            dynamic_mapping: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.scss'],
                    dest: 'public/build/stylesheets',
                    ext: '.css',
                }]
            }
        },

        watch: {
            js: {
                files: ["public/js/**/*.jsx", "public/js/**/*.js", "!public/build/**/*", "!public/js/**/__tests__/*"],
                tasks: ["browserify"]
            },
            css: {
                files:["public/stylesheets/**/*.scss"],
                tasks: ["sass"]
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify', 'sass']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
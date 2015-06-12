module.exports = function (grunt) {

    // Load JSHint task
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        uglify: {
            prod: {
                options: {
                    mangle: true,
                    compress: false,
                    beautify: true,
                    sourceMap: true
                },
                files: {
                    'js/script.min.js': [
                    ]
                }
            },
            modernizr: {
                options: {
                    mangle: true,
                    compress: true,
                    beautify: false
                },
                files: {
                    'js/modernizr.min.js': ['js/modernizr.js']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        src: 'bower_components/normalize.css/normalize.css',
                        dest: 'scss/plugins/_normalize.scss'
                    },
                    {
                        src: 'bower_components/jquery.selectBoxIt/src/stylesheets/jquery.selectBoxIt.css',
                        dest: 'scss/plugins/_jquery.selectBoxIt.scss'
                    },
                    {
                        src: 'bower_components/modernizr/modernizr.js',
                        dest: 'js/modernizr.js'
                    }
                ]
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'css',
                    imagesDir: 'img',
                    relativeAssets: true,
                    fontsDir: 'fonts',
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            js: {
                files: ["js/**/*.js"],
                tasks: ["uglify:prod"],
                options: {
                    livereload: 36944
                }
            },
            compass: {
                files: ["scss/**/*.scss"],
                tasks: ["compass:dist"],
                options: {
                    livereload: 36944
                }
            },
            html: {
                files: ["**/*/.php"],
                tasks: [],
                options: {
                    livereload: 36944
                }
            }

        }
    });

    // Default task.
    grunt.registerTask('default', ['uglify:prod'], 'watch');
    grunt.registerTask('build', ['uglify:prod'], 'copy');
};
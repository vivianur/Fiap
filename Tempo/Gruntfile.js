module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            ead: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    'css/padrao.css': '_sass/padrao.scss'
                }
            }
        },
        uglify: {
            ead: {
                options: {
                    mangle: false
                },
                files: {
                    'js/padrao.js': [
                        '_js/jquery.js',
                        '_js/jquery.magnificpopup.js',
                        '_js/jquery.mcustomscrollbar.js',
                        '_js/jquery.mousewheel.js',
                        '_js/jquery.slick.js',
                        '_js/jquery.ui.js',
                        '_js/jquery.ui.touch-punch.min.js',
                        '_js/wow.js',
                        '_js/padrao.js'
                    ]
                }
            }
        },
        imagemin: {
            ead: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'images/'
                }]
            }
        },
        watch: {
            css: {
                files: ['_sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['_js/**/*.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('img', ['imagemin']);

    grunt.registerTask('w', ['watch']);

    grunt.registerTask('padrao', ['sass', 'uglify']);
};

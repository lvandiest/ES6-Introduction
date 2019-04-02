
/* global module, require */
'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    // Set variables
    var serverPort          = grunt.option('serverPort') || 9000;
    var reloadPort          = grunt.option('reloadPort') || serverPort + 1;
    var hostname            = grunt.option('hostname') || '0.0.0.0';

    grunt.initConfig({
        livereload: {
            port: reloadPort + 1
        },
        
        watch: {
			options: {
				nospawn: true,
				livereload: reloadPort
			},
			// Live reload for web server
			livereload: {
				files: [
					'app/{,*/}*.html',
					'app/{css/{,*/}*.css',
					'app/js/{,*/}*.js',
					'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['livereload']
			}
		},
        
		// Start a webserver
        connect: {
            options: {
                port: serverPort,
                // change this to '0.0.0.0' to access the server from outside
                hostname: hostname
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        
        // Open files in default browser
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/app/index.html'//,
                //app: 'Chrome'
            }
        },
        
    });

    /**
     * @description Starts a grunt webserver.
     * @param serverPort string Port to start the server on. Default is 9000.
     * @example Run '$ grunt server --serverPort=9999'
     */
    grunt.registerTask('server', [
        'livereload-start',
        'connect:livereload',
        'open:server',
        'watch'
    ]);

};
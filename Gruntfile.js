'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var worldConfig = {
    app: 'public',
    dist: 'dist'
  };

  var reloadPort = 35729, files;

  grunt.initConfig({
    world: worldConfig,
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['.tmp', '<%= world.dist %>/*'],
      server: '.tmp',
      results: 'results/*'
    },

    concat: {
      dist: {
        src: ['<%= world.app %>/**/*.js', '!<%= world.app %>/bower_components/recorderjs/recorderWorker.js'],
        dest: '.tmp/js/main.js'
      }
    },

    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, worldConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          base: ".",
          port: 9001,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'test'),
              mountFolder(connect, worldConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, worldConfig.dist)
            ];
          }
        }
      }
    },

    casperjs: {
      files: [
        'test/e2e/*.js'
      ],
      options: {}
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= world.app %>',
          dest: '<%= world.dist %>',
          src: [
            '*.{ico,txt}',
            'img/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',
            'soundfont/**/*.*',
            'bower_components/recorderjs/recorderWorker.js'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= world.app %>',
          dest: '<%= world.dist %>/styles/public',
          src: ['img/{,*/}*.png', 'bower_components/jquery-ui/themes/smoothness/images/*.{gif,png}']
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= world.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= world.app %>/bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
            '<%= world.app %>/bower_components/jquery-ui/themes/smoothness/theme.css',
            '<%= world.app %>/bower_components/backbone-modal/backbone.modal.css',
            '<%= world.app %>/bower_components/backbone-modal/backbone.modal.theme.css',
            '<%= world.app %>/css/{,*/}*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= world.app %>',
          src: '*.html',
          dest: '<%= world.dist %>'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= world.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= world.dist %>/images'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: ['Gruntfile.js'],
      all: [
        'Gruntfile.js',
        'public/js/**/*.js',
        'test/unit/**/*.js',
        '!test/unit/lib/**/*.js'
      ]
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= world.dist %>/scripts/{,*/}*.js',
            '<%= world.dist %>/styles/{,*/}*.css',
            '<%= world.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/main.min.js': ['.tmp/js/*.js']
        }
      }
    },

    useminPrepare: {
      html: '<%= world.app %>/index.html',
      options: {
        dest: '<%= world.dist %>'
      }
    },

    usemin: {
      html: ['<%= world.dist %>/{,*/}*.html'],
      css: ['<%= world.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= world.dist %>']
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%= world.app %>/*.html',
          '{.tmp,<%= world.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= world.app %>}/scripts/{,*/}*.js',
          '<%= world.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= world.app %>/scripts/templates/*.{ejs,mustache,hbs}',
          'test/unit/**/*.js'
        ]
      },
      casperjs: {
        files: [
          'test/e2e/*.js'
        ],
        options: {},
        e2e: {
          files: {
            'results/casper': 'test/e2e/*.js'
          }
        }
      },
      js: {
        files: [
          'app.js',
          'server/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build', 'karma:watch:run', 'casperjs' ]
      },
      //al TODO review server: express:dev,
      server: {
        files: [ 'server/**' ],
        tasks: [ 'build', /*'express:dev',*/ 'casperjs' ],
        options: {
          spawn: false // Restart server
        }
      },
      unitTests: {
        files: [ 'test/unit/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      integrationTests: {
        files: [ 'test/integration/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      e2eTests: {
        files: [ 'test/e2e/**/*.js' ],
        tasks: [ 'casperjs' ]
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: true
        }
      },
      views: {
        files: [
          'server/views/*.ejs',
          'server/views/**/*.ejs'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded)
          grunt.log.ok('Delayed live reload successful.');
        else
          grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('test', function (isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
      'clean:server',
      'clean:results',
      'createDefaultTemplate',
      'connect:test',
      // Karma works when run using 'Grunt serve:test'
      //'karma:ci',
      'casperjs'
    ];

    if(!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'createDefaultTemplate',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin:dist',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'createDefaultTemplate',
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'createDefaultTemplate',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build',   ['concat', 'ngtemplates']);
  grunt.registerTask('default', ['clean', 'connect', 'build', 'watch']);

  grunt.initConfig({
    clean: {
      build: 'public/dist'
    },

    concat: {
      app: {
        src: 'public/app/**/*.js',
        dest: 'public/dist/app.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          hostname: '127.0.0.1',
          base: 'public'
        }
      }
    },

    jshint: {
      app: {
        src: 'public/app/**/*.js'
      }
    },

    ngtemplates: {
      app: {
        options: {
          module: 'gitboard'
        },
        cwd: 'public/app',
        src: '**/*.html',
        dest: 'public/dist/templates.js',
      }
    },

    watch: {
      options: {
        livereload: true,
        spawn: false,
      },
      scripts: {
        files: 'public/app/**/*.js',
        tasks: ['jshint', 'concat'],
      },
      templates: {
        files: 'public/**/*.html',
        tasks: ['ngtemplates']
      }
    }
  });
};

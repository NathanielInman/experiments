/* jshint -W079 */
var
  gulp = require('gulp'),
  gladius = require('gladius-forge'),
  server = require('./app');


/**
 * Here you can configure the gulp build system with custom folders, different
 * build modules, etc.
 * ------------------------------------------------------------------------- */
gladius.config(gulp, {
  modules: {
    // module to use to preprocess your stylesheets. default: less
    // possible values: less, sass, sassCompass, stylus, myth.
    styles: 'stylus',
    // module to use to preprocess your stylesheets. default: handlebars
    // possible values: handlebars, jade, dust, dot.
    templates: 'jade'
  },
  paths: {
    src: {
      // folder home of your source files (less, js, etc). default: src/
      base: 'src/',

      // styles sources folder. default: styles/
      styles: 'styles/',

      // scripts folder. default: scripts/
      scripts: 'scripts/',

      // file extension for es6+ scripts. default: .es6
      esnextExtension: '.es6.js',

      // templates and partials folder: default: ../views/, partials/
      templates: '../views/',
      partials: 'partials/'
    },

    out: {
      // folder destination for built bundles. default: public/
      base: 'dist/',

      // production ready styles folder. default: css/
      styles: 'css/',

      // production ready scripts folder. default: js/
      scripts: 'js/'
    }
  },
  // if the gulpfile is located in a different folder to the one which contains
  // your scripts, a force clean is required, to wipe the temp folder.
  forceClean: false,
  // express web server to use while developing.
  // port default: 3000
  // liveReloadPort default: 35729
  server: server,
  port: 3000,
  liveReloadPort: null
});




/**
 * Here you can hook extra tasks as dependency for predefined tasks (insert
 * a leading '!' to remove dependencies) or add additional sources (insert a
 * leading '!' to the path to delcare sources which should be ignored).
 * ------------------------------------------------------------------------- */
gladius.setupTasks({
  'bundle-js': {
    deps: [],
    src: []
  },
  'bundle-js:dev': {
    deps: ['bundle-mock-server', '!lint', '!esnext'],
    src: []
  },
  'lint': {
    deps: [],
    src: [
      '!src/scripts/vendor/**/*',
      '!src/scripts/mock/lib/**/*',
    ]
  }
});


/**
 * Add extra gulp tasks below
 * ------------------------------------------------------------------------- */
var $ = gladius.getPlugins();


/* Mock server bundling */
gulp.task('bundle-mock-server', ['lint', 'esnext'], function() {
  return gulp.src(['src/temp/mock/server.es6.js'])
  .pipe($.browserify({
    insertGlobals: false,
    debug: true
  }))
  .pipe($.rename(function (path) {
    path.basename = 'mock-server';
    path.extname = '.js';
  }))
  .pipe(gulp.dest('dist/js/'));
});


/**
 * Add extra gulp watchers below
 * ------------------------------------------------------------------------- */
gladius.setupWatchers(function(gulp) {});



/**
 * Here you can inject extra tasks into the main tasks. Those will be appendend
 * and concurrently run with other tasks.
 * ------------------------------------------------------------------------- */
gladius.setupMain({
  'development': [
    
  ],
  'test': [],
  'production': [
    
  ]
});

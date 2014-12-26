'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

$.fs = require('fs');
$.sync = require('browser-sync');
$.run = require('run-sequence');
$.del = require('del');
$.merge = require('merge-stream');
$.mqpacker = require('css-mqpacker');
$.bower = require('main-bower-files');


/*
 * Options
 */

process.env.NODE_ENV = 'DEVELOPMENT';

var opts = {};

opts.src = {
  data: ['app/data/*.json', '!app/data/data.json'],
  locals: 'app/data/data.json',
  views: 'app/views/*.swig',
  styles: 'app/styles/**/*.scss',
  scripts: {
    dev: 'app/scripts/**/*.js',
    head: [
      'bower_components/modernizr/modernizr.js',
      'app/scripts/head.js'
    ],
    app: [
      'bower_components/jquery/dist/jquery.js',
      'app/scripts/app.js'
    ]
  },
  fonts: 'app/fonts/**/*.*',
  images: ['app/images/**/*.*', '!app/images/sprite/*.*'],
  sprite: 'app/images/sprite/*.png',
  clean: ['dist', '.tmp'],
  copy: ['.tmp/**/*.*', '!.tmp/styles/vendors', '!.tmp/styles/vendors/**/*.*'],
  syncBaseDir: ['.', '.tmp'],
  watch: {
    data: ['app/data/*.json', '!app/data/data.json'],
    views: 'app/views/**/*.swig',
    styles: ['app/styles/**/*.scss', '!app/styles/**/*scsslint*.scss'],
    scripts: 'app/scripts/**/*.js',
    images: [
      'app/images/**/*.*',
      '!app/images/sprite/*.*'
    ],
    sprite: 'app/images/sprite/*.*'
  }
};

opts.dest = {
  data: 'app/data',
  views: '.tmp',
  bowerstyles: '.tmp/styles/vendors',
  styles: '.tmp/styles',
  scripts: '.tmp/scripts',
  fonts: '.tmp/fonts',
  spriteCss: 'app/styles/helpers',
  spriteImg: 'app/images',
  images: '.tmp/images',
  copy: 'dist'
};

opts.views = {
  defaults: {
      cache: false
    }
};

opts.notify = {
  views: {
    errorHandler: $.notify.onError('VIEWS: BUILD FAILED!\n' +
      'Error:\n<%= error.message %>')
  },
  styles: {
    errorHandler: $.notify.onError('STYLES: BUILD FAILED!\n' +
      'Error:\n<%= error.message %>')
  },
  scripts: {
    errorHandler: $.notify.onError('SCRIPTS: BUILD FAILED!\n' +
      'Error:\n<%= error.message %>')
  },
  images: {
    errorHandler: $.notify.onError('IMAGES: SOMETHING WRONG!\n' +
      'Error:\n<%= error.message %>')
  }
};

opts.inject = {
  head: {
    starttag: '<!--head:js-->',
    endtag: '<!--/head:js-->',
    relative: true,
    ignorePath: '../'
  },
  app: {
    starttag: '<!--app:js-->',
    endtag: '<!--/app:js-->',
    relative: true,
    ignorePath: '../'
  }
};

opts.prettify = {
  indent_size: 2,
  indent_char: ' ',
  indent_inner_html: true,
  preserve_newlines: true,
  unformatted: [
    'pre',
    'code',
    'span'
  ]
};

opts.rename = { suffix: '.min' };

opts.bowerstyles = {
  in: '**/*.css',
  out: '**/*.scss',
  rename: {
    prefix: '_',
    extname: '.scss'
  }
};

opts.autoprefixer = {
  browsers: [
    'last 5 version',
    'Explorer > 7',
    'Opera > 8'
  ]
};

opts.concat = {
  head: 'head.all.min.js',
  app: 'app.all.min.js'
};

opts.uglify = { preserveComments: 'some' };

opts.spritesmith = {
  imgName: 'sprite.png',
  cssName: '_sprite.scss',
  imgPath: '../images/sprite.png',
  cssFormat: 'scss',
  cssTemplate: './.sprite.scss.template',
  padding: 2,
  algorithm: 'binary-tree'
};

opts.imagemin = {
  progressive: true,
  optimizationLevel: 6,
  interlaced: true
};


/*
 * Data
 */

gulp.task('data', function () {
  return gulp.src(opts.src.data)
    .pipe($.extend('data.json'))
    .pipe(gulp.dest(opts.dest.data));
});


/*
 * Views
 */

gulp.task('views', function () {
  return gulp.src(opts.src.views)
    .pipe($.newer(opts.dest.views))
    .pipe($.plumber(opts.notify.views))
    .pipe($.data(function() {
      return JSON.parse($.fs.readFileSync(opts.src.locals, 'utf8'));
    }))
    
    .pipe($.swig(opts.views))
    .pipe($.preprocess())
    .pipe($.prettify(opts.prettify))
    .pipe($.inject(gulp.src(opts.src.scripts.head, {read: false}),
      opts.inject.head
    ))
    .pipe($.inject(gulp.src(opts.src.scripts.app, {read: false}),
      opts.inject.app
    ))
    .pipe(gulp.dest(opts.dest.views))
    .pipe($.sync.reload({ stream: true }));
});


/*
 * Styles
 */

gulp.task('styles:bower', function () {
  return gulp.src($.bower())
    .pipe($.if(opts.bowerstyles.in, $.rename(opts.bowerstyles.rename)))
    .pipe($.if(opts.bowerstyles.out, gulp.dest(opts.dest.bowerstyles)));
});

gulp.task('styles', ['styles:bower'], function() {
  return gulp.src(opts.src.styles)
    .pipe($.newer(opts.dest.styles))
    .pipe($.plumber(opts.notify.styles))
    .pipe($.sass())
    
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.csscomb())
    .pipe(gulp.dest(opts.dest.styles))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.postcss([ $.mqpacker ])))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.rename(opts.rename)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.minifyCss()))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', gulp.dest(opts.dest.styles)))
    .pipe($.sync.reload({ stream: true }));
});


/*
 * Scripts
 */

gulp.task('scripts', function () {
  var dev = gulp.src(opts.src.scripts.dev)
    .pipe($.newer(opts.dest.scripts))
    .pipe(gulp.dest(opts.dest.scripts))
    .pipe($.sync.reload({ stream: true }));

  var head = gulp.src(opts.src.scripts.head)
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.concat(opts.concat.head)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.uglify(opts.uglify)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', gulp.dest(opts.dest.scripts)));

  var app = gulp.src(opts.src.scripts.app)
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.concat(opts.concat.app)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.uglify(opts.uglify)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', gulp.dest(opts.dest.scripts)));

  return $.merge(dev, head, app);
});


/*
 * Resources
 */

gulp.task('fonts', function () {
  return gulp.src(opts.src.fonts)
    .pipe($.newer(opts.dest.fonts))
    .pipe(gulp.dest(opts.dest.fonts));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(opts.src.sprite)
    .pipe($.spritesmith(opts.spritesmith));

  var image = spriteData.img
    .pipe(gulp.dest(opts.dest.spriteImg));

  var styles = spriteData.css
    .pipe(gulp.dest(opts.dest.spriteCss));

  return $.merge(image, styles);
});

gulp.task('images', function () {
  return gulp.src(opts.src.images)
    .pipe($.plumber(opts.notify.images))
    .pipe($.if(process.env.NODE_ENV === 'DEVELOPMENT', $.newer(opts.dest.images)))
    .pipe($.if(process.env.NODE_ENV === 'DISTRIBUTION', $.imagemin(opts.imagemin)))
    .pipe(gulp.dest(opts.dest.images))
    .pipe($.sync.reload({ stream: true }));
});


/*
 * Utils
 */

gulp.task('clean', function (cb) {
  $.del(opts.src.clean, { dot: true, read: false }, cb);
});

gulp.task('copy', function () {
  return gulp.src(opts.src.copy)
    .pipe(gulp.dest(opts.dest.copy));
});


/*
 * Main tasks
 */

gulp.task('default', ['clean'], function (cb) {
  $.run(['data', 'sprite', 'scripts'], ['views', 'styles', 'images', 'fonts'], cb);
});

gulp.task('dist', ['clean'], function (cb) {
  process.env.NODE_ENV = 'DISTRIBUTION';
  $.run(['data', 'sprite', 'scripts'], ['views', 'styles', 'images', 'fonts'], 'copy', cb);
});

gulp.task('serve', ['default'], function () {
  $.sync.init(null, {
    server: {
      baseDir: opts.src.syncBaseDir,
      routes: {
        '/bower_components': '../bower_components'
      }
    }
  });

  $.watch(opts.src.watch.data, function () {
    $.run('data', 'views');
  });

  $.watch(opts.src.watch.scripts, function () {
    $.run('scripts');
  });

  $.watch(opts.src.watch.sprite, function () {
    $.run('sprite');
  });

  $.watch(opts.src.watch.images, function () {
    $.run('images');
  });

  $.watch(opts.src.watch.styles, function () {
    $.run('styles');
  });

  $.watch(opts.src.watch.views, function () {
    $.run('views');
  });
});

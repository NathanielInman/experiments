// Load plugins
var gulp = require('gulp'), // This streaming build system
    browserSync = require('browser-sync'), // Server & live reload system
    reload = browserSync.reload, // Ensure the event emitter is set
    stylus = require('gulp-stylus'), // CSS Pre-processor
    ks = require('kouto-swiss'),

    jade = require('gulp-jade'), // Template language for HTML5
    notify = require('gulp-notify'), // Give notification on updates
    babel = require('gulp-babel'), // Babel (formerly 6to5) ECMAScript transpiler
    concat = require('gulp-concat'), // Concatenate files together
    minifycss = require('gulp-minify-css'), // Make css smaller and more digestable
    minifyjs = require('gulp-uglify'), // Make js smaller and more digestable
    jshint = require('gulp-jshint'), // Linter for javascript
    stylish = require('jshint-stylish'), // Makes jshints output pretty
    optimize = require('amd-optimize'), // Final step in building - optimizes modules
    append = require('gulp-insert').append; //append a string to the end of a file

// Styles - pre-process all styles and push the css to dist
gulp.task('styles', function(){
  gulp.src('src/styles/*.styl')
    .pipe(concat('app.min.styl'))
    .pipe(stylus({
      use: ks(),

      compress: true
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Stylus finished compiling to <%= file.relative %>.' }));
}); //end 'styles' task

// Jade - convert Jade to HTML
gulp.task('jade', function(){
  gulp.src('src/views/*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Jade finished compiling to <%= file.relative %>.' }));
}); //end 'jade' task

// Scripts - concatenate & Minify Javascript
gulp.task('scripts', function(){
  gulp.src('src/scripts/**/*.js')
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      blacklist: ["useStrict"],
      modules: 'amd',
      moduleIds: true
    }))
    .pipe(optimize('app'))
    //.pipe(minifyjs())
    .pipe(concat('runtime.min.js'))
    .pipe(append('\nrequire(["app"]);'))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Scripts finished compiling to <%= file.relative %>.' }));
}); //end 'scripts' task

// The browser-sync task will start a server but not watch any files.
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: 'dist/'
    },
    port:3000
  });
}); //end 'browser-sync' task

// Watch
gulp.task('watch', ['browser-sync'], function(){
  // Watch stylus files
  gulp.watch('src/styles/**/*.styl', ['styles', reload]);

  // Watch javascript files
  gulp.watch('src/scripts/**/*.js', ['scripts', reload]);

  // Watch jade files
  gulp.watch('src/views/**/*.jade', ['jade', reload]);
}); //end 'watch' task

// Main tasks
gulp.task('build',['styles','scripts','jade'])
gulp.task('default', ['build','watch']);

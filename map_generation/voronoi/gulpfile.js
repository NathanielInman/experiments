// Load plugins
var gulp = require('gulp'), // This streaming build system
    browserSync = require('browser-sync'), // Server & live reload system
    reload = browserSync.reload, // Ensure the event emitter is set
    stylus = require('gulp-stylus'), // CSS Pre-processor
    nib = require('nib'),
    jade = require('gulp-jade'), // Template language for HTML5
    notify = require('gulp-notify'), // Give notification on updates
    babel = require('gulp-babel'), // Babel (formerly 6to5) ECMAScript transpiler
    concat = require('gulp-concat'), // Concatenate files together
    uglify = require('gulp-uglify'), // Make js smaller and more digestable
    jshint = require('gulp-jshint'), // Linter for javascript
    stylish = require('jshint-stylish'), // Makes jshints output pretty
    optimize = require('amd-optimize'), // Final step in building - optimizes modules
    append = require('gulp-insert').append; //append a string to the end of a file

// Styles - pre-process all styles and push the css to dist
gulp.task('styles', function(){
  return gulp.src('src/styles/**/!(_)*.styl')
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(notify({ message: 'Stylus finished compiling to <%= file.relative %>.' }));
}); //end 'styles' task

// Jade - convert Jade to HTML
gulp.task('jade', function(){
  return gulp.src('src/views/**/!(_)*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Jade finished compiling to <%= file.relative %>.' }));
}); //end 'jade' task

// Scripts - concatenate & Minify Javascript
gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter(stylish))
    .pipe(babel({
      blacklist: ["useStrict"],
      modules: 'amd',
      moduleIds: true
    }))
    .pipe(optimize('app'))
    .pipe(uglify())
    .pipe(concat('runtime.min.js'))
    .pipe(append('\nrequire(["app"]);'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(notify({ message: 'Scripts finished compiling to <%= file.relative %>.' }));
}); //end 'scripts' task

// Assets - ensure root resource are moved to dist
gulp.task('assets',function(){
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/'));
}); //end 'assets' task

// Adding all asynchronous build steps into one task
gulp.task('build',['styles','jade','assets','scripts']);

// The browser-sync task will start a server but not watch any files.
gulp.task('browser-sync', ['build'], function(){
  browserSync({
    server:{
      baseDir: 'dist/'
    }
  });
}); //end 'browser-sync' task

// Watch
gulp.task('watch', ['browser-sync'], function(){
  // Watch all assets
  gulp.watch('src/assets/**/*',['assets', reload]);

  // Watch stylus files
  gulp.watch('src/styles/**/*.styl', ['styles', reload]);

  // Watch javascript files
  gulp.watch('src/scripts/**/*.js', ['scripts', reload]);

  // Watch jade files
  gulp.watch('src/views/**/*.jade', ['jade', reload]);
}); //end 'watch' task

// Main task entrypoint, requirement chains upward to build, then back down to watch
gulp.task('default', ['watch']);

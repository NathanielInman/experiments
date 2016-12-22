// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jade = require('gulp-jade');

gulp.task('default',['jade','stylus']);

/**
 * path globs
 */
var paths = {
  src : {
    jade: 'src/index.jade',
    stylus: 'src/css/*'
  },
  dist : {
    jade: 'dist',
    stylus: 'dist/css'
  }
};

// Build Jade Templates
gulp.task('jade',function(){
  return gulp.src(paths.src.jade)
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest(paths.dist.jade));
});

// Build Stylus Files
gulp.task('stylus',function(){
  return gulp.src(paths.src.stylus)
    .pipe(stylus({
      use: nib(),
      compress:true
    }))
    .pipe(gulp.dest(paths.dist.stylus));
});
var gulp = require('gulp');
var paths = require('../paths');
var watch = require('gulp-watch');
var jadeMarko = require('jade-marko');

// custom jade compilation to Marko
gulp.task('jade:marko', function() {
  gulp.src(paths.jade)
    .pipe(jadeMarko())
    .pipe(gulp.dest('./apps'))
});

gulp.task('jade:watch', function () {
  gulp.watch(paths.jade, ['jade:marko']);
});

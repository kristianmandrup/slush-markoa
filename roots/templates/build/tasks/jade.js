var gulp = require('gulp');
var watch = require('gulp-watch');
var jadeMarko = require('jade-markoa');

// custom jade compilation to Marko
gulp.task('jade:marko', function() {
  gulp.src(paths.jade)
    .pipe(jadeMarko({basedir: 'apps'}))
    .pipe(gulp.dest('./apps'))
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);

// watch jade files, compile to marko
gulp.task('jade:watch', function() {
  gulp.src(paths.jade])
    .pipe(watch(paths.jade))
    .pipe(jadeMarko({basedir: 'apps'}))
    .pipe(gulp.dest('./apps'))
});

var gulp = require('gulp');
var watch = require('gulp-watch');
var jadeMarko = require('jade-markoa');

// custom jade compilation to Marko
gulp.task('jade:marko', function() {
  gulp.src(['apps/**/*.jade'])
    .pipe(jadeMarko({basedir: 'apps'}))
    .pipe(gulp.dest('./apps'))
});


// watch jade files, compile to marko
gulp.task('jade:watch', function() {
  gulp.src(['apps/**/*.jade'])
    .pipe(watch('css/**/*.css'))
    .pipe(jadeMarko({basedir: 'apps'}))
    .pipe(gulp.dest('./apps'))
});

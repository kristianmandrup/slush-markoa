var gulp = require('gulp');
var paths = require('../paths');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// SASS to Stylus
// https://www.npmjs.com/package/sass2stylus
// curl -F file=/your/local/file.scss http://sass2stylus.com/api > new_file.styl

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var axis = require('axis')
var rupture = require('rupture');
var jeet = require('jeet');
var nib = require('nib');
/*var autoprefixer = require('autoprefixer-core');*/

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus({'include css': true, use: [nib(), axis(), rupture(), jeet()/*, autoprefixer()*/]}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styleDest));
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);
});

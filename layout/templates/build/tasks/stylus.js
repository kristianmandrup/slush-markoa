var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var axis = require('axis')
var rupture = require('rupture');
var fluidity = require('fluidity');
var jeet = require('jeet');
var nib = require('nib');
var autoprefixer = require('autoprefixer-stylus');

var stylusPlugins = [nib(), fluidity(), axis(), rupture(), jeet(), autoprefixer()];
var stylusOpts = {'include css': true, use: stylusPlugins};

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus(stylusOpts))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesDist));
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);
});

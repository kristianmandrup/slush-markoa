var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

// TODO: Uncomment as per the plugins you use and have installed!
// var axis = require('axis')
// var rupture = require('rupture');
// var fluidity = require('fluidity');
// var fluidity = require('typographic');
// var jeet = require('jeet');
// var nib = require('nib');
// var autoprefixer = require('autoprefixer-stylus');
// var stylusPlugins = [nib(), fluidity(), axis(), rupture(), jeet(), autoprefixer(), typographic()];

var stylusPlugins = [];
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

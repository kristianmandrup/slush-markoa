var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');

// =========================================================
// Load Stylus plugins you wish to use
// =========================================================
// var poststylus = require('poststylus');
// var clearfix = require('postcss-clearfix')
// var responsiveType = require('postcss-responsive-type')
// var rucksack = require('rucksack-css');
// var position = require('postcss-position');
// var lost = require('lost');
// var autoprefixer = require('autoprefixer-stylus');
// var axis = require('axis')
// var rupture = require('rupture');
// var fluidity = require('fluidity');
// var fluidity = require('typographic');
var jeet = require('jeet');
// var nib = require('nib');

// =========================================================
// Enable specific Stylus plugins
// =========================================================
// var stylusPlugins = [
//  nib(), fluidity(), axis(), rupture(), jeet(),
//  autoprefixer(), typographic(),
//  poststylus([rucksack(), lost(), position(), clearfix(), responsiveType()])
// ];

var stylusPlugins = [jeet()];
var stylusOpts = {'include css': true, use: stylusPlugins};

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(print())
    .pipe(sourcemaps.init())
    .pipe(stylus(stylusOpts))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesDist));
});

gulp.task('stylus:watch', function () {
  gulp.watch(paths.stylus, ['stylus']);
});

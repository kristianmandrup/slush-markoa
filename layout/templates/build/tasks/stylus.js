var gulp = require('gulp');
var paths = require('../paths');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

// TODO: Uncomment as per the plugins you use and have installed!
// https://www.npmjs.com/package/rucksack-css
// https://www.npmjs.com/package/lost

// var poststylus = require('poststylus');
// var clearfix = require('postcss-clearfix')
// var responsiveType = require('postcss-responsive-type')
// var rucksack = require('rucksack-css');
// var position = require('postcss-position');
// var lost = require('lost');

// rucksack-css, postcss-position', 'lost'
// https://www.npmjs.com/~corysimmons

// var autoprefixer = require('autoprefixer-stylus');
// var axis = require('axis')
// var rupture = require('rupture');
// var fluidity = require('fluidity');
// var fluidity = require('typographic');
// var jeet = require('jeet');
// var nib = require('nib');

// var stylusPlugins = [
//  nib(), fluidity(), axis(), rupture(), jeet(),
//  autoprefixer(), typographic(),
//  poststylus([rucksack(), lost(), position(), clearfix(), responsiveType()])
// ];

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

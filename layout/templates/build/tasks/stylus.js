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

var stylusAppPaths = [];
try {
  var apps = require('./apps')
  for (let app of apps.list) {
    stylusAppPaths.push(path.join(apps.rootPath, app, 'assets')
  }
} catch (e) {
  console.warn('WARNING: You should compile your apps via:\n$ npm run compile')
}

// add stylus paths global assets
paths.stylus.concat(['apps/_global/assets']);
// add stylus paths for each app assets
paths.stylus.concat(stylusAppPaths);

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

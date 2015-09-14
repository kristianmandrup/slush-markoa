/*jslint node: true */
'use strict';

var gulp = require('gulp');
var paths = require('../paths');
var jadeMarko = require('jade-marko');
var path = require('path');

var rootPath = path.resolve(path.join('../../', __dirname));

var options = {
  rootPath:  rootPath,
  log: true,
  templateDirs: {
    global: path.join(rootPath, 'apps', '_global', 'layouts'),
    layout: '../layouts',
    mixin: '../mixins',
    'parent-layout': '../../layouts'
  }
};


// custom jade compilation to Marko
gulp.task('jade:marko', function() {
  gulp.src(paths.jade)
    .pipe(jadeMarko(options))
    .pipe(gulp.dest('./apps'));
});

gulp.task('jade:watch', function () {
  gulp.watch(paths.jade, ['jade:marko']);
});

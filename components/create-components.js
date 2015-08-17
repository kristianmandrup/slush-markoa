var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

var writer = require('./writer');
var jsonfile = require('jsonfile')

module.exports = function(answers) {
  gulp.src(__dirname + '/templates/' + answers.uiFramework)
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./apps/_global'))
      .pipe(install())
      .on('end', function () {
          done();
      });
}

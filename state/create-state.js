var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

var jsonfile = require('jsonfile')

module.exports = function(answers) {
  var templateDir = answers.where === '' ? 'global' : answers.appName;
  var targetDir = answers.where === '' ? '_global' : answers.appName;

  gulp.src(__dirname + '/templates/' + templateDir)
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./apps/' + targetDir + '/state'))
      .pipe(install())
      .on('end', function () {
          done();
      });
}

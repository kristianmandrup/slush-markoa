/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

function gulpEm(answers, dest) {
  gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest(dest))
      .pipe(install());
}

module.exports = function(answers, targetDir, done) {
  try {
    answers.widgetNameSlug = _.slugify(answers.widgetName);
    if (!answers.widgetNameSlug.match(/-/)) {
      chalk.error('Widget name must be of the form  xx-yyy, was:' + answers.widgetNameSlug);
      throw 'Bad widget name';
    }
    answers.widgetNameSlug = _.slugify(answers.widgetName);
    var dest = path.join(targetDir, 'components', 'widgets', answers.widgetNameSlug);
    answers.widgetNamePretty = _.humanize(answers.widgetName);

    gulpEm(answers, dest);
  } catch (e) {
    return done();
  }
};

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

module.exports = function(answers, targetDir) {
  answers.tagNameSlug = _.slugify(answers.tagName);
  if (!answers.tagNameSlug.match(/-/)) {
    chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
    return done();
  }
  answers.tagNameSlug = _.slugify(answers.tagName);
  var dest = path.join(targetDir, 'components', answers.tagNameSlug);

  answers.tagNamePretty = _.humanize(answers.tagName);
  gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest(dest))
      .pipe(install())
      .on('end', function () {
          done();
      });
}

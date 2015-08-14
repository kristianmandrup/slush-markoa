var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

module.exports = function(answers, targetDir) {
  var compFileName = answers.tagName;
  var subFoldersPath = '';
  var subFolders = [];

  //sub folder
  var splits = compFileName.split(':');
  if (splits.length > 0) {
    var last = splits.length -1;
    compFileName = splits.slice(last);
    subFolders = splits.slice(0, last);
    subFoldersPath = subFolders.join('/');
  }

  answers.tagNameSlug = _.slugify(compFileName);
  if (!answers.tagNameSlug.match(/-/)) {
      if (subFoldersPath.length) {
        answers.tagNameSlug = [subFolders[subFolders.length -1], answers.tagNameSlug].join('-');
      } else {
        chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
        return done();
      }
  }
  var dest = path.join(targetDir, 'components', subFoldersPath, answers.tagNameSlug);
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

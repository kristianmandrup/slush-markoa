
var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    chalk = require('chalk-log'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    print = require('gulp-print'),
    template = require('gulp-template');

module.exports = function(answers) {
  chalk.ok('npm install gulp-sass gulp-sourcemaps --save-dev');

  gulp.src(__dirname + '/sass/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./styles'))
      .pipe(install())
      .on('end', function () {
          done();
      });
}

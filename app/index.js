var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

module.exports = function(defaults) {
  return function (done) {
      var prompts = [{
          name: 'appName',
          message: 'What is the name of your project?',
          default: ''
      }, {
          type: 'confirm',
          name: 'moveon',
          message: 'Continue?'
      }];
      //Ask
      inquirer.prompt(prompts,
          function (answers) {
              if (!answers.moveon) {
                  return done();
              }
              answers.appNameSlug = _.slugify(answers.appName);
              if (answers.appNameSlug == '') done();
              gulp.src(templatesRoot + '/templates/**')
                  .pipe(template(answers))
                  .pipe(rename(function (file) {
                      if (file.basename[0] === '_') {
                          file.basename = '.' + file.basename.slice(1);
                      }
                  }))
                  .pipe(conflict('./'))
                  .pipe(gulp.dest('./apps/' + answers.appNameSlug))
                  .pipe(install())
                  .on('end', function () {
                      done();
                  });
          }
      );
  }
}

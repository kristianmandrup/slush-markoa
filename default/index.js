/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    chalk = require('chalk-log');

module.exports = function(defaults) {
    return function (done) {
        chalk.ok('Compile your app by running:');
        chalk.log('gulp jade:marko');

        var prompts = require('./prompts')(defaults);
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                if (_.isBlank(answers.appNameSlug)) {
                  done();
                }
                answers.appNameSlug = _.slugify(answers.appName);

                var packagePath = 'package-path="./assets/${data.name}.browser.json")';
                answers.lassoPage = 'lasso-page(name="$data.name"' + packagePath;

                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        // see https://github.com/wearefractal/vinyl
                        if (file.basename[0] === '_') {
                            if (file.basename !== '_global') {
                              file.basename = '.' + file.basename.slice(1);
                            }
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .pipe(install())
                    .on('end', function () {
                        done();
                    });
            }
        );
    };
};
